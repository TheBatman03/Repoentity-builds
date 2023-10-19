import { createSelector } from '@ngrx/store';
export function createSelectorsFactory() {
    function getSelectors(selectState) {
        const selectIds = (state) => state.ids;
        const selectEntities = (state) => state.entities;
        const selectAll = createSelector(selectIds, selectEntities, (ids, entities) => ids.map((id) => entities[id]));
        const selectTotal = createSelector(selectIds, (ids) => ids.length);
        if (!selectState) {
            return {
                selectIds,
                selectEntities,
                selectAll,
                selectTotal,
            };
        }
        return {
            selectIds: createSelector(selectState, selectIds),
            selectEntities: createSelector(selectState, selectEntities),
            selectAll: createSelector(selectState, selectAll),
            selectTotal: createSelector(selectState, selectTotal),
        };
    }
    return { getSelectors };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVfc2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL3N0YXRlX3NlbGVjdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBTzdDLE1BQU0sVUFBVSxzQkFBc0I7SUFLcEMsU0FBUyxZQUFZLENBQ25CLFdBQTRDO1FBRTVDLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzVDLE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNqRSxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQzlCLFNBQVMsRUFDVCxjQUFjLEVBQ2QsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBRSxRQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQ3BFLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUMsU0FBUyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNoQixPQUFPO2dCQUNMLFNBQVM7Z0JBQ1QsY0FBYztnQkFDZCxTQUFTO2dCQUNULFdBQVc7YUFDWixDQUFDO1NBQ0g7UUFFRCxPQUFPO1lBQ0wsU0FBUyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDO1lBQ2pELGNBQWMsRUFBRSxjQUFjLENBQUMsV0FBVyxFQUFFLGNBQWMsQ0FBQztZQUMzRCxTQUFTLEVBQUUsY0FBYyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUM7WUFDakQsV0FBVyxFQUFFLGNBQWMsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDO1NBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQsT0FBTyxFQUFFLFlBQVksRUFBRSxDQUFDO0FBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEVudGl0eVN0YXRlLFxuICBFbnRpdHlTZWxlY3RvcnMsXG4gIE1lbW9pemVkRW50aXR5U2VsZWN0b3JzLFxufSBmcm9tICcuL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTZWxlY3RvcnNGYWN0b3J5PFQ+KCkge1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoKTogRW50aXR5U2VsZWN0b3JzPFQsIEVudGl0eVN0YXRlPFQ+PjtcbiAgZnVuY3Rpb24gZ2V0U2VsZWN0b3JzPFY+KFxuICAgIHNlbGVjdFN0YXRlOiAoc3RhdGU6IFYpID0+IEVudGl0eVN0YXRlPFQ+XG4gICk6IE1lbW9pemVkRW50aXR5U2VsZWN0b3JzPFQsIFY+O1xuICBmdW5jdGlvbiBnZXRTZWxlY3RvcnMoXG4gICAgc2VsZWN0U3RhdGU/OiAoc3RhdGU6IGFueSkgPT4gRW50aXR5U3RhdGU8VD5cbiAgKTogRW50aXR5U2VsZWN0b3JzPFQsIGFueT4ge1xuICAgIGNvbnN0IHNlbGVjdElkcyA9IChzdGF0ZTogYW55KSA9PiBzdGF0ZS5pZHM7XG4gICAgY29uc3Qgc2VsZWN0RW50aXRpZXMgPSAoc3RhdGU6IEVudGl0eVN0YXRlPFQ+KSA9PiBzdGF0ZS5lbnRpdGllcztcbiAgICBjb25zdCBzZWxlY3RBbGwgPSBjcmVhdGVTZWxlY3RvcihcbiAgICAgIHNlbGVjdElkcyxcbiAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgKGlkcywgZW50aXRpZXMpOiBhbnkgPT4gaWRzLm1hcCgoaWQ6IGFueSkgPT4gKGVudGl0aWVzIGFzIGFueSlbaWRdKVxuICAgICk7XG5cbiAgICBjb25zdCBzZWxlY3RUb3RhbCA9IGNyZWF0ZVNlbGVjdG9yKHNlbGVjdElkcywgKGlkcykgPT4gaWRzLmxlbmd0aCk7XG5cbiAgICBpZiAoIXNlbGVjdFN0YXRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzZWxlY3RJZHMsXG4gICAgICAgIHNlbGVjdEVudGl0aWVzLFxuICAgICAgICBzZWxlY3RBbGwsXG4gICAgICAgIHNlbGVjdFRvdGFsLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc2VsZWN0SWRzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0SWRzKSxcbiAgICAgIHNlbGVjdEVudGl0aWVzOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0RW50aXRpZXMpLFxuICAgICAgc2VsZWN0QWxsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0QWxsKSxcbiAgICAgIHNlbGVjdFRvdGFsOiBjcmVhdGVTZWxlY3RvcihzZWxlY3RTdGF0ZSwgc2VsZWN0VG90YWwpLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4geyBnZXRTZWxlY3RvcnMgfTtcbn1cbiJdfQ==