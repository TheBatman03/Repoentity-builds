import { createSelector } from '@ngrx/store';
export function createSelectorsFactory() {
    function getSelectors(selectState) {
        var selectIds = function (state) { return state.ids; };
        var selectEntities = function (state) { return state.entities; };
        var selectAll = createSelector(selectIds, selectEntities, function (ids, entities) {
            return ids.map(function (id) { return entities[id]; });
        });
        var selectTotal = createSelector(selectIds, function (ids) { return ids.length; });
        if (!selectState) {
            return {
                selectIds: selectIds,
                selectEntities: selectEntities,
                selectAll: selectAll,
                selectTotal: selectTotal,
            };
        }
        return {
            selectIds: createSelector(selectState, selectIds),
            selectEntities: createSelector(selectState, selectEntities),
            selectAll: createSelector(selectState, selectAll),
            selectTotal: createSelector(selectState, selectTotal),
        };
    }
    return { getSelectors: getSelectors };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRzdDLE1BQU07SUFLSixzQkFDRSxXQUE0QztRQUU1QyxJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssQ0FBQyxHQUFHLEVBQVQsQ0FBUyxDQUFDO1FBQzVDLElBQU0sY0FBYyxHQUFHLFVBQUMsS0FBcUIsSUFBSyxPQUFBLEtBQUssQ0FBQyxRQUFRLEVBQWQsQ0FBYyxDQUFDO1FBQ2pFLElBQU0sU0FBUyxHQUFHLGNBQWMsQ0FDOUIsU0FBUyxFQUNULGNBQWMsRUFDZCxVQUFDLEdBQVEsRUFBRSxRQUF1QjtZQUNoQyxPQUFBLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQyxFQUFPLElBQUssT0FBQyxRQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFyQixDQUFxQixDQUFDO1FBQTNDLENBQTJDLENBQzlDLENBQUM7UUFFRixJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUyxFQUFFLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sRUFBVixDQUFVLENBQUMsQ0FBQztRQUVqRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDO2dCQUNMLFNBQVMsV0FBQTtnQkFDVCxjQUFjLGdCQUFBO2dCQUNkLFNBQVMsV0FBQTtnQkFDVCxXQUFXLGFBQUE7YUFDWixDQUFDO1NBQ0g7UUFFRCxNQUFNLENBQUM7WUFDTCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsY0FBYyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDO1lBQzNELFNBQVMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztZQUNqRCxXQUFXLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUM7U0FDdEQsQ0FBQztLQUNIO0lBRUQsTUFBTSxDQUFDLEVBQUUsWUFBWSxjQUFBLEVBQUUsQ0FBQztDQUN6QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRW50aXR5U3RhdGUsIEVudGl0eVNlbGVjdG9ycywgRGljdGlvbmFyeSB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNlbGVjdG9yc0ZhY3Rvcnk8VD4oKSB7XG4gIGZ1bmN0aW9uIGdldFNlbGVjdG9ycygpOiBFbnRpdHlTZWxlY3RvcnM8VCwgRW50aXR5U3RhdGU8VD4+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnM8Vj4oXG4gICAgc2VsZWN0U3RhdGU6IChzdGF0ZTogVikgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoXG4gICAgc2VsZWN0U3RhdGU/OiAoc3RhdGU6IGFueSkgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIGFueT4ge1xuICAgIGNvbnN0IHNlbGVjdElkcyA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5pZHM7XG4gICAgY29uc3Qgc2VsZWN0RW50aXRpZXMgPSAoc3RhdGU6IEVudGl0eVN0YXRlPFQ+KSA9PiBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBzZWxlY3RBbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdElkcyxcbiAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgKGlkczogVFtdLCBlbnRpdGllczogRGljdGlvbmFyeTxUPik6IGFueSA9PlxuICAgICAgICBpZHMubWFwKChpZDogYW55KSA9PiAoZW50aXRpZXMgYXMgYW55KVtpZF0pXG4gICAgKTtcblxuICAgIGNvbnN0IHNlbGVjdFRvdGFsID0gY3JlYXRlU2VsZWN0b3Ioc2VsZWN0SWRzLCBpZHMgPT4gaWRzLmxlbmd0aCk7XG5cbiAgICBpZiAoIXNlbGVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RJZHMsXG4gICAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFRvdGFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0SWRzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0SWRzKSxcbiAgICAgIHNlbGVjdEVudGl0aWVzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0RW50aXRpZXMpLFxuICAgICAgc2VsZWN0QWxsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0QWxsKSxcbiAgICAgIHNlbGVjdFRvdGFsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0VG90YWwpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRTZWxlY3RvcnMgfTtcbn1cbiJdfQ==