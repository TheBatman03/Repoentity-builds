import { createStateOperator, DidMutate } from './state_adapter';
import { selectIdValue } from './utils';
export function createUnsortedStateAdapter(selectId) {
    function addOneMutably(entity, state) {
        const key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            return DidMutate.None;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    function addManyMutably(entities, state) {
        let didMutate = false;
        for (const entity of entities) {
            didMutate = addOneMutably(entity, state) !== DidMutate.None || didMutate;
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function setAllMutably(entities, state) {
        state.ids = [];
        state.entities = {};
        addManyMutably(entities, state);
        return DidMutate.Both;
    }
    function setOneMutably(entity, state) {
        const key = selectIdValue(entity, selectId);
        if (key in state.entities) {
            state.entities[key] = entity;
            return DidMutate.EntitiesOnly;
        }
        state.ids.push(key);
        state.entities[key] = entity;
        return DidMutate.Both;
    }
    function setManyMutably(entities, state) {
        const didMutateSetOne = entities.map((entity) => setOneMutably(entity, state));
        switch (true) {
            case didMutateSetOne.some((didMutate) => didMutate === DidMutate.Both):
                return DidMutate.Both;
            case didMutateSetOne.some((didMutate) => didMutate === DidMutate.EntitiesOnly):
                return DidMutate.EntitiesOnly;
            default:
                return DidMutate.None;
        }
    }
    function removeOneMutably(key, state) {
        return removeManyMutably([key], state);
    }
    function removeManyMutably(keysOrPredicate, state) {
        const keys = keysOrPredicate instanceof Array
            ? keysOrPredicate
            : state.ids.filter((key) => keysOrPredicate(state.entities[key]));
        const didMutate = keys
            .filter((key) => key in state.entities)
            .map((key) => delete state.entities[key]).length > 0;
        if (didMutate) {
            state.ids = state.ids.filter((id) => id in state.entities);
        }
        return didMutate ? DidMutate.Both : DidMutate.None;
    }
    function removeAll(state) {
        return Object.assign({}, state, {
            ids: [],
            entities: {},
        });
    }
    function takeNewKey(keys, update, state) {
        const original = state.entities[update.id];
        const updated = Object.assign({}, original, update.changes);
        const newKey = selectIdValue(updated, selectId);
        const hasNewKey = newKey !== update.id;
        if (hasNewKey) {
            keys[update.id] = newKey;
            delete state.entities[update.id];
        }
        state.entities[newKey] = updated;
        return hasNewKey;
    }
    function updateOneMutably(update, state) {
        return updateManyMutably([update], state);
    }
    function updateManyMutably(updates, state) {
        const newKeys = {};
        updates = updates.filter((update) => update.id in state.entities);
        const didMutateEntities = updates.length > 0;
        if (didMutateEntities) {
            const didMutateIds = updates.filter((update) => takeNewKey(newKeys, update, state)).length >
                0;
            if (didMutateIds) {
                state.ids = state.ids.map((id) => newKeys[id] || id);
                return DidMutate.Both;
            }
            else {
                return DidMutate.EntitiesOnly;
            }
        }
        return DidMutate.None;
    }
    function mapMutably(map, state) {
        const changes = state.ids.reduce((changes, id) => {
            const change = map(state.entities[id]);
            if (change !== state.entities[id]) {
                changes.push({ id, changes: change });
            }
            return changes;
        }, []);
        const updates = changes.filter(({ id }) => id in state.entities);
        return updateManyMutably(updates, state);
    }
    function mapOneMutably({ map, id }, state) {
        const entity = state.entities[id];
        if (!entity) {
            return DidMutate.None;
        }
        const updatedEntity = map(entity);
        return updateOneMutably({
            id: id,
            changes: updatedEntity,
        }, state);
    }
    function upsertOneMutably(entity, state) {
        return upsertManyMutably([entity], state);
    }
    function upsertManyMutably(entities, state) {
        const added = [];
        const updated = [];
        for (const entity of entities) {
            const id = selectIdValue(entity, selectId);
            if (id in state.entities) {
                updated.push({ id, changes: entity });
            }
            else {
                added.push(entity);
            }
        }
        const didMutateByUpdated = updateManyMutably(updated, state);
        const didMutateByAdded = addManyMutably(added, state);
        switch (true) {
            case didMutateByAdded === DidMutate.None &&
                didMutateByUpdated === DidMutate.None:
                return DidMutate.None;
            case didMutateByAdded === DidMutate.Both ||
                didMutateByUpdated === DidMutate.Both:
                return DidMutate.Both;
            default:
                return DidMutate.EntitiesOnly;
        }
    }
    return {
        removeAll,
        addOne: createStateOperator(addOneMutably),
        addMany: createStateOperator(addManyMutably),
        setAll: createStateOperator(setAllMutably),
        setOne: createStateOperator(setOneMutably),
        setMany: createStateOperator(setManyMutably),
        updateOne: createStateOperator(updateOneMutably),
        updateMany: createStateOperator(updateManyMutably),
        upsertOne: createStateOperator(upsertOneMutably),
        upsertMany: createStateOperator(upsertManyMutably),
        removeOne: createStateOperator(removeOneMutably),
        removeMany: createStateOperator(removeManyMutably),
        map: createStateOperator(mapMutably),
        mapOne: createStateOperator(mapOneMutably),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5zb3J0ZWRfc3RhdGVfYWRhcHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvZW50aXR5L3NyYy91bnNvcnRlZF9zdGF0ZV9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVBLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBS3hDLE1BQU0sVUFBVSwwQkFBMEIsQ0FBSSxRQUF1QjtJQUluRSxTQUFTLGFBQWEsQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUM1QyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRTVDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDekIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7UUFFN0IsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFHRCxTQUFTLGNBQWMsQ0FBQyxRQUFlLEVBQUUsS0FBVTtRQUNqRCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdEIsS0FBSyxNQUFNLE1BQU0sSUFBSSxRQUFRLEVBQUU7WUFDN0IsU0FBUyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7U0FDMUU7UUFFRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsUUFBZSxFQUFFLEtBQVU7UUFDaEQsS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDZixLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVwQixjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRWhDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBR0QsU0FBUyxhQUFhLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDNUMsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUU1QyxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQzdCLE9BQU8sU0FBUyxDQUFDLFlBQVksQ0FBQztTQUMvQjtRQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBRTdCLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztJQUN4QixDQUFDO0lBR0QsU0FBUyxjQUFjLENBQUMsUUFBZSxFQUFFLEtBQVU7UUFDakQsTUFBTSxlQUFlLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQzlDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQzdCLENBQUM7UUFFRixRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztZQUN4QixLQUFLLGVBQWUsQ0FBQyxJQUFJLENBQ3ZCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFlBQVksQ0FDcEQ7Z0JBQ0MsT0FBTyxTQUFTLENBQUMsWUFBWSxDQUFDO1lBQ2hDO2dCQUNFLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN6QjtJQUNILENBQUM7SUFHRCxTQUFTLGdCQUFnQixDQUFDLEdBQVEsRUFBRSxLQUFVO1FBQzVDLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBSUQsU0FBUyxpQkFBaUIsQ0FDeEIsZUFBcUMsRUFDckMsS0FBVTtRQUVWLE1BQU0sSUFBSSxHQUNSLGVBQWUsWUFBWSxLQUFLO1lBQzlCLENBQUMsQ0FBQyxlQUFlO1lBQ2pCLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNFLE1BQU0sU0FBUyxHQUNiLElBQUk7YUFDRCxNQUFNLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQzNDLEdBQUcsQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUU5RCxJQUFJLFNBQVMsRUFBRTtZQUNiLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakU7UUFFRCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztJQUNyRCxDQUFDO0lBR0QsU0FBUyxTQUFTLENBQWMsS0FBVTtRQUN4QyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRTtZQUM5QixHQUFHLEVBQUUsRUFBRTtZQUNQLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQU9ELFNBQVMsVUFBVSxDQUNqQixJQUEyQixFQUMzQixNQUFpQixFQUNqQixLQUFVO1FBRVYsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MsTUFBTSxPQUFPLEdBQU0sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRCxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sU0FBUyxHQUFHLE1BQU0sS0FBSyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBRXZDLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUM7WUFDekIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNsQztRQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBRWpDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFHRCxTQUFTLGdCQUFnQixDQUFDLE1BQVcsRUFBRSxLQUFVO1FBQy9DLE9BQU8saUJBQWlCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsU0FBUyxpQkFBaUIsQ0FBQyxPQUFjLEVBQUUsS0FBVTtRQUNuRCxNQUFNLE9BQU8sR0FBNkIsRUFBRSxDQUFDO1FBRTdDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsRSxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksaUJBQWlCLEVBQUU7WUFDckIsTUFBTSxZQUFZLEdBQ2hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTTtnQkFDckUsQ0FBQyxDQUFDO1lBRUosSUFBSSxZQUFZLEVBQUU7Z0JBQ2hCLEtBQUssQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO2FBQ3ZCO2lCQUFNO2dCQUNMLE9BQU8sU0FBUyxDQUFDLFlBQVksQ0FBQzthQUMvQjtTQUNGO1FBRUQsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFHRCxTQUFTLFVBQVUsQ0FBQyxHQUFRLEVBQUUsS0FBVTtRQUN0QyxNQUFNLE9BQU8sR0FBZ0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQzNDLENBQUMsT0FBYyxFQUFFLEVBQW1CLEVBQUUsRUFBRTtZQUN0QyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksTUFBTSxLQUFLLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ2pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDLEVBQ0QsRUFBRSxDQUNILENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVqRSxPQUFPLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBSUQsU0FBUyxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFPLEVBQUUsS0FBVTtRQUNqRCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7UUFFRCxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEMsT0FBTyxnQkFBZ0IsQ0FDckI7WUFDRSxFQUFFLEVBQUUsRUFBRTtZQUNOLE9BQU8sRUFBRSxhQUFhO1NBQ3ZCLEVBQ0QsS0FBSyxDQUNOLENBQUM7SUFDSixDQUFDO0lBR0QsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFXLEVBQUUsS0FBVTtRQUMvQyxPQUFPLGlCQUFpQixDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELFNBQVMsaUJBQWlCLENBQUMsUUFBZSxFQUFFLEtBQVU7UUFDcEQsTUFBTSxLQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ3hCLE1BQU0sT0FBTyxHQUFVLEVBQUUsQ0FBQztRQUUxQixLQUFLLE1BQU0sTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUM3QixNQUFNLEVBQUUsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDdkM7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwQjtTQUNGO1FBRUQsTUFBTSxrQkFBa0IsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsTUFBTSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXRELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxnQkFBZ0IsS0FBSyxTQUFTLENBQUMsSUFBSTtnQkFDdEMsa0JBQWtCLEtBQUssU0FBUyxDQUFDLElBQUk7Z0JBQ3JDLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztZQUN4QixLQUFLLGdCQUFnQixLQUFLLFNBQVMsQ0FBQyxJQUFJO2dCQUN0QyxrQkFBa0IsS0FBSyxTQUFTLENBQUMsSUFBSTtnQkFDckMsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDO1lBQ3hCO2dCQUNFLE9BQU8sU0FBUyxDQUFDLFlBQVksQ0FBQztTQUNqQztJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsU0FBUztRQUNULE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1FBQzFDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7UUFDMUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLGNBQWMsQ0FBQztRQUM1QyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUM7UUFDaEQsVUFBVSxFQUFFLG1CQUFtQixDQUFDLGlCQUFpQixDQUFDO1FBQ2xELFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCxVQUFVLEVBQUUsbUJBQW1CLENBQUMsaUJBQWlCLENBQUM7UUFDbEQsU0FBUyxFQUFFLG1CQUFtQixDQUFDLGdCQUFnQixDQUFDO1FBQ2hELFVBQVUsRUFBRSxtQkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQztRQUNsRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDO1FBQ3BDLE1BQU0sRUFBRSxtQkFBbUIsQ0FBQyxhQUFhLENBQUM7S0FDM0MsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBFbnRpdHlTdGF0ZSxcbiAgRW50aXR5U3RhdGVBZGFwdGVyLFxuICBJZFNlbGVjdG9yLFxuICBVcGRhdGUsXG4gIFByZWRpY2F0ZSxcbiAgRW50aXR5TWFwLFxuICBFbnRpdHlNYXBPbmVOdW0sXG4gIEVudGl0eU1hcE9uZVN0cixcbn0gZnJvbSAnLi9tb2RlbHMnO1xuaW1wb3J0IHsgY3JlYXRlU3RhdGVPcGVyYXRvciwgRGlkTXV0YXRlIH0gZnJvbSAnLi9zdGF0ZV9hZGFwdGVyJztcbmltcG9ydCB7IHNlbGVjdElkVmFsdWUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyPFQ+KFxuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPlxuKTogRW50aXR5U3RhdGVBZGFwdGVyPFQ+O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVVuc29ydGVkU3RhdGVBZGFwdGVyPFQ+KHNlbGVjdElkOiBJZFNlbGVjdG9yPFQ+KTogYW55IHtcbiAgdHlwZSBSID0gRW50aXR5U3RhdGU8VD47XG5cbiAgZnVuY3Rpb24gYWRkT25lTXV0YWJseShlbnRpdHk6IFQsIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRPbmVNdXRhYmx5KGVudGl0eTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXkgPSBzZWxlY3RJZFZhbHVlKGVudGl0eSwgc2VsZWN0SWQpO1xuXG4gICAgaWYgKGtleSBpbiBzdGF0ZS5lbnRpdGllcykge1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgIH1cblxuICAgIHN0YXRlLmlkcy5wdXNoKGtleSk7XG4gICAgc3RhdGUuZW50aXRpZXNba2V5XSA9IGVudGl0eTtcblxuICAgIHJldHVybiBEaWRNdXRhdGUuQm90aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBhZGRNYW55TXV0YWJseShlbnRpdGllczogYW55W10sIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGxldCBkaWRNdXRhdGUgPSBmYWxzZTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBkaWRNdXRhdGUgPSBhZGRPbmVNdXRhYmx5KGVudGl0eSwgc3RhdGUpICE9PSBEaWRNdXRhdGUuTm9uZSB8fCBkaWRNdXRhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRBbGxNdXRhYmx5KGVudGl0aWVzOiBUW10sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBzZXRBbGxNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgc3RhdGUuaWRzID0gW107XG4gICAgc3RhdGUuZW50aXRpZXMgPSB7fTtcblxuICAgIGFkZE1hbnlNdXRhYmx5KGVudGl0aWVzLCBzdGF0ZSk7XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIGNvbnN0IGtleSA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG5cbiAgICBpZiAoa2V5IGluIHN0YXRlLmVudGl0aWVzKSB7XG4gICAgICBzdGF0ZS5lbnRpdGllc1trZXldID0gZW50aXR5O1xuICAgICAgcmV0dXJuIERpZE11dGF0ZS5FbnRpdGllc09ubHk7XG4gICAgfVxuXG4gICAgc3RhdGUuaWRzLnB1c2goa2V5KTtcbiAgICBzdGF0ZS5lbnRpdGllc1trZXldID0gZW50aXR5O1xuXG4gICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHNldE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgZGlkTXV0YXRlU2V0T25lID0gZW50aXRpZXMubWFwKChlbnRpdHkpID0+XG4gICAgICBzZXRPbmVNdXRhYmx5KGVudGl0eSwgc3RhdGUpXG4gICAgKTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSBkaWRNdXRhdGVTZXRPbmUuc29tZSgoZGlkTXV0YXRlKSA9PiBkaWRNdXRhdGUgPT09IERpZE11dGF0ZS5Cb3RoKTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Cb3RoO1xuICAgICAgY2FzZSBkaWRNdXRhdGVTZXRPbmUuc29tZShcbiAgICAgICAgKGRpZE11dGF0ZSkgPT4gZGlkTXV0YXRlID09PSBEaWRNdXRhdGUuRW50aXRpZXNPbmx5XG4gICAgICApOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVPbmVNdXRhYmx5KGtleTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHJlbW92ZU9uZU11dGFibHkoa2V5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiByZW1vdmVNYW55TXV0YWJseShba2V5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkoa2V5czogVFtdLCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gcmVtb3ZlTWFueU11dGFibHkocHJlZGljYXRlOiBQcmVkaWNhdGU8VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiByZW1vdmVNYW55TXV0YWJseShcbiAgICBrZXlzT3JQcmVkaWNhdGU6IGFueVtdIHwgUHJlZGljYXRlPFQ+LFxuICAgIHN0YXRlOiBhbnlcbiAgKTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBrZXlzID1cbiAgICAgIGtleXNPclByZWRpY2F0ZSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8ga2V5c09yUHJlZGljYXRlXG4gICAgICAgIDogc3RhdGUuaWRzLmZpbHRlcigoa2V5OiBhbnkpID0+IGtleXNPclByZWRpY2F0ZShzdGF0ZS5lbnRpdGllc1trZXldKSk7XG5cbiAgICBjb25zdCBkaWRNdXRhdGUgPVxuICAgICAga2V5c1xuICAgICAgICAuZmlsdGVyKChrZXk6IGFueSkgPT4ga2V5IGluIHN0YXRlLmVudGl0aWVzKVxuICAgICAgICAubWFwKChrZXk6IGFueSkgPT4gZGVsZXRlIHN0YXRlLmVudGl0aWVzW2tleV0pLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlKSB7XG4gICAgICBzdGF0ZS5pZHMgPSBzdGF0ZS5pZHMuZmlsdGVyKChpZDogYW55KSA9PiBpZCBpbiBzdGF0ZS5lbnRpdGllcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZE11dGF0ZSA/IERpZE11dGF0ZS5Cb3RoIDogRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVBbGw8UyBleHRlbmRzIFI+KHN0YXRlOiBTKTogUztcbiAgZnVuY3Rpb24gcmVtb3ZlQWxsPFMgZXh0ZW5kcyBSPihzdGF0ZTogYW55KTogUyB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICBpZHM6IFtdLFxuICAgICAgZW50aXRpZXM6IHt9LFxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IFJcbiAgKTogdm9pZDtcbiAgZnVuY3Rpb24gdGFrZU5ld0tleShcbiAgICBrZXlzOiB7IFtpZDogc3RyaW5nXTogYW55IH0sXG4gICAgdXBkYXRlOiBVcGRhdGU8VD4sXG4gICAgc3RhdGU6IGFueVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLmVudGl0aWVzW3VwZGF0ZS5pZF07XG4gICAgY29uc3QgdXBkYXRlZDogVCA9IE9iamVjdC5hc3NpZ24oe30sIG9yaWdpbmFsLCB1cGRhdGUuY2hhbmdlcyk7XG4gICAgY29uc3QgbmV3S2V5ID0gc2VsZWN0SWRWYWx1ZSh1cGRhdGVkLCBzZWxlY3RJZCk7XG4gICAgY29uc3QgaGFzTmV3S2V5ID0gbmV3S2V5ICE9PSB1cGRhdGUuaWQ7XG5cbiAgICBpZiAoaGFzTmV3S2V5KSB7XG4gICAgICBrZXlzW3VwZGF0ZS5pZF0gPSBuZXdLZXk7XG4gICAgICBkZWxldGUgc3RhdGUuZW50aXRpZXNbdXBkYXRlLmlkXTtcbiAgICB9XG5cbiAgICBzdGF0ZS5lbnRpdGllc1tuZXdLZXldID0gdXBkYXRlZDtcblxuICAgIHJldHVybiBoYXNOZXdLZXk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVPbmVNdXRhYmx5KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gdXBkYXRlT25lTXV0YWJseSh1cGRhdGU6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KFt1cGRhdGVdLCBzdGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXM6IGFueVtdLCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBuZXdLZXlzOiB7IFtpZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcblxuICAgIHVwZGF0ZXMgPSB1cGRhdGVzLmZpbHRlcigodXBkYXRlKSA9PiB1cGRhdGUuaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgY29uc3QgZGlkTXV0YXRlRW50aXRpZXMgPSB1cGRhdGVzLmxlbmd0aCA+IDA7XG5cbiAgICBpZiAoZGlkTXV0YXRlRW50aXRpZXMpIHtcbiAgICAgIGNvbnN0IGRpZE11dGF0ZUlkcyA9XG4gICAgICAgIHVwZGF0ZXMuZmlsdGVyKCh1cGRhdGUpID0+IHRha2VOZXdLZXkobmV3S2V5cywgdXBkYXRlLCBzdGF0ZSkpLmxlbmd0aCA+XG4gICAgICAgIDA7XG5cbiAgICAgIGlmIChkaWRNdXRhdGVJZHMpIHtcbiAgICAgICAgc3RhdGUuaWRzID0gc3RhdGUuaWRzLm1hcCgoaWQ6IGFueSkgPT4gbmV3S2V5c1tpZF0gfHwgaWQpO1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gRGlkTXV0YXRlLk5vbmU7XG4gIH1cblxuICBmdW5jdGlvbiBtYXBNdXRhYmx5KG1hcDogRW50aXR5TWFwPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwTXV0YWJseShtYXA6IGFueSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgY2hhbmdlczogVXBkYXRlPFQ+W10gPSBzdGF0ZS5pZHMucmVkdWNlKFxuICAgICAgKGNoYW5nZXM6IGFueVtdLCBpZDogc3RyaW5nIHwgbnVtYmVyKSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZSA9IG1hcChzdGF0ZS5lbnRpdGllc1tpZF0pO1xuICAgICAgICBpZiAoY2hhbmdlICE9PSBzdGF0ZS5lbnRpdGllc1tpZF0pIHtcbiAgICAgICAgICBjaGFuZ2VzLnB1c2goeyBpZCwgY2hhbmdlczogY2hhbmdlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VzO1xuICAgICAgfSxcbiAgICAgIFtdXG4gICAgKTtcbiAgICBjb25zdCB1cGRhdGVzID0gY2hhbmdlcy5maWx0ZXIoKHsgaWQgfSkgPT4gaWQgaW4gc3RhdGUuZW50aXRpZXMpO1xuXG4gICAgcmV0dXJuIHVwZGF0ZU1hbnlNdXRhYmx5KHVwZGF0ZXMsIHN0YXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1hcE9uZU11dGFibHkobWFwOiBFbnRpdHlNYXBPbmVOdW08VD4sIHN0YXRlOiBSKTogRGlkTXV0YXRlO1xuICBmdW5jdGlvbiBtYXBPbmVNdXRhYmx5KG1hcDogRW50aXR5TWFwT25lU3RyPFQ+LCBzdGF0ZTogUik6IERpZE11dGF0ZTtcbiAgZnVuY3Rpb24gbWFwT25lTXV0YWJseSh7IG1hcCwgaWQgfTogYW55LCBzdGF0ZTogYW55KTogRGlkTXV0YXRlIHtcbiAgICBjb25zdCBlbnRpdHkgPSBzdGF0ZS5lbnRpdGllc1tpZF07XG4gICAgaWYgKCFlbnRpdHkpIHtcbiAgICAgIHJldHVybiBEaWRNdXRhdGUuTm9uZTtcbiAgICB9XG5cbiAgICBjb25zdCB1cGRhdGVkRW50aXR5ID0gbWFwKGVudGl0eSk7XG4gICAgcmV0dXJuIHVwZGF0ZU9uZU11dGFibHkoXG4gICAgICB7XG4gICAgICAgIGlkOiBpZCxcbiAgICAgICAgY2hhbmdlczogdXBkYXRlZEVudGl0eSxcbiAgICAgIH0sXG4gICAgICBzdGF0ZVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiB1cHNlcnRPbmVNdXRhYmx5KGVudGl0eTogVCwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE9uZU11dGFibHkoZW50aXR5OiBhbnksIHN0YXRlOiBhbnkpOiBEaWRNdXRhdGUge1xuICAgIHJldHVybiB1cHNlcnRNYW55TXV0YWJseShbZW50aXR5XSwgc3RhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBzZXJ0TWFueU11dGFibHkoZW50aXRpZXM6IFRbXSwgc3RhdGU6IFIpOiBEaWRNdXRhdGU7XG4gIGZ1bmN0aW9uIHVwc2VydE1hbnlNdXRhYmx5KGVudGl0aWVzOiBhbnlbXSwgc3RhdGU6IGFueSk6IERpZE11dGF0ZSB7XG4gICAgY29uc3QgYWRkZWQ6IGFueVtdID0gW107XG4gICAgY29uc3QgdXBkYXRlZDogYW55W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgZW50aXR5IG9mIGVudGl0aWVzKSB7XG4gICAgICBjb25zdCBpZCA9IHNlbGVjdElkVmFsdWUoZW50aXR5LCBzZWxlY3RJZCk7XG4gICAgICBpZiAoaWQgaW4gc3RhdGUuZW50aXRpZXMpIHtcbiAgICAgICAgdXBkYXRlZC5wdXNoKHsgaWQsIGNoYW5nZXM6IGVudGl0eSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZGVkLnB1c2goZW50aXR5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRNdXRhdGVCeVVwZGF0ZWQgPSB1cGRhdGVNYW55TXV0YWJseSh1cGRhdGVkLCBzdGF0ZSk7XG4gICAgY29uc3QgZGlkTXV0YXRlQnlBZGRlZCA9IGFkZE1hbnlNdXRhYmx5KGFkZGVkLCBzdGF0ZSk7XG5cbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgIGNhc2UgZGlkTXV0YXRlQnlBZGRlZCA9PT0gRGlkTXV0YXRlLk5vbmUgJiZcbiAgICAgICAgZGlkTXV0YXRlQnlVcGRhdGVkID09PSBEaWRNdXRhdGUuTm9uZTpcbiAgICAgICAgcmV0dXJuIERpZE11dGF0ZS5Ob25lO1xuICAgICAgY2FzZSBkaWRNdXRhdGVCeUFkZGVkID09PSBEaWRNdXRhdGUuQm90aCB8fFxuICAgICAgICBkaWRNdXRhdGVCeVVwZGF0ZWQgPT09IERpZE11dGF0ZS5Cb3RoOlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkJvdGg7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gRGlkTXV0YXRlLkVudGl0aWVzT25seTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJlbW92ZUFsbCxcbiAgICBhZGRPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IoYWRkT25lTXV0YWJseSksXG4gICAgYWRkTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcihhZGRNYW55TXV0YWJseSksXG4gICAgc2V0QWxsOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldEFsbE11dGFibHkpLFxuICAgIHNldE9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihzZXRPbmVNdXRhYmx5KSxcbiAgICBzZXRNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHNldE1hbnlNdXRhYmx5KSxcbiAgICB1cGRhdGVPbmU6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBkYXRlT25lTXV0YWJseSksXG4gICAgdXBkYXRlTWFueTogY3JlYXRlU3RhdGVPcGVyYXRvcih1cGRhdGVNYW55TXV0YWJseSksXG4gICAgdXBzZXJ0T25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHVwc2VydE9uZU11dGFibHkpLFxuICAgIHVwc2VydE1hbnk6IGNyZWF0ZVN0YXRlT3BlcmF0b3IodXBzZXJ0TWFueU11dGFibHkpLFxuICAgIHJlbW92ZU9uZTogY3JlYXRlU3RhdGVPcGVyYXRvcihyZW1vdmVPbmVNdXRhYmx5KSxcbiAgICByZW1vdmVNYW55OiBjcmVhdGVTdGF0ZU9wZXJhdG9yKHJlbW92ZU1hbnlNdXRhYmx5KSxcbiAgICBtYXA6IGNyZWF0ZVN0YXRlT3BlcmF0b3IobWFwTXV0YWJseSksXG4gICAgbWFwT25lOiBjcmVhdGVTdGF0ZU9wZXJhdG9yKG1hcE9uZU11dGFibHkpLFxuICB9O1xufVxuIl19