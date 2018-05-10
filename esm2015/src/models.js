/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 * @template T
 */
export class Dictionary {
}
/**
 * @record
 * @template T
 */
export function EntityState() { }
function EntityState_tsickle_Closure_declarations() {
    /** @type {?} */
    EntityState.prototype.ids;
    /** @type {?} */
    EntityState.prototype.entities;
}
/**
 * @record
 * @template T
 */
export function EntityDefinition() { }
function EntityDefinition_tsickle_Closure_declarations() {
    /** @type {?} */
    EntityDefinition.prototype.selectId;
    /** @type {?} */
    EntityDefinition.prototype.sortComparer;
}
/**
 * @record
 * @template T
 */
export function EntityStateAdapter() { }
function EntityStateAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    EntityStateAdapter.prototype.addOne;
    /** @type {?} */
    EntityStateAdapter.prototype.addMany;
    /** @type {?} */
    EntityStateAdapter.prototype.addAll;
    /** @type {?} */
    EntityStateAdapter.prototype.removeOne;
    /** @type {?} */
    EntityStateAdapter.prototype.removeOne;
    /** @type {?} */
    EntityStateAdapter.prototype.removeMany;
    /** @type {?} */
    EntityStateAdapter.prototype.removeMany;
    /** @type {?} */
    EntityStateAdapter.prototype.removeAll;
    /** @type {?} */
    EntityStateAdapter.prototype.updateOne;
    /** @type {?} */
    EntityStateAdapter.prototype.updateMany;
    /** @type {?} */
    EntityStateAdapter.prototype.upsertOne;
    /** @type {?} */
    EntityStateAdapter.prototype.upsertMany;
}
/**
 * @record
 * @template T
 */
export function EntityAdapter() { }
function EntityAdapter_tsickle_Closure_declarations() {
    /** @type {?} */
    EntityAdapter.prototype.selectId;
    /** @type {?} */
    EntityAdapter.prototype.sortComparer;
    /** @type {?} */
    EntityAdapter.prototype.getInitialState;
    /** @type {?} */
    EntityAdapter.prototype.getInitialState;
    /** @type {?} */
    EntityAdapter.prototype.getSelectors;
    /** @type {?} */
    EntityAdapter.prototype.getSelectors;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc3JjL21vZGVscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQXdCQSxNQUFNO0NBRUwiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdHlwZSBDb21wYXJlclN0cjxUPiA9IHtcbiAgKGE6IFQsIGI6IFQpOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBDb21wYXJlck51bTxUPiA9IHtcbiAgKGE6IFQsIGI6IFQpOiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBDb21wYXJlcjxUPiA9IENvbXBhcmVyTnVtPFQ+IHwgQ29tcGFyZXJTdHI8VD47XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JTdHI8VD4gPSB7XG4gIChtb2RlbDogVCk6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3JOdW08VD4gPSB7XG4gIChtb2RlbDogVCk6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIElkU2VsZWN0b3I8VD4gPSBJZFNlbGVjdG9yU3RyPFQ+IHwgSWRTZWxlY3Rvck51bTxUPjtcblxuZXhwb3J0IHR5cGUgRGljdGlvbmFyeU51bTxUPiA9IHtcbiAgW2lkOiBudW1iZXJdOiBUO1xufTtcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIERpY3Rpb25hcnk8VD4gaW1wbGVtZW50cyBEaWN0aW9uYXJ5TnVtPFQ+IHtcbiAgW2lkOiBzdHJpbmddOiBUO1xufVxuXG5leHBvcnQgdHlwZSBVcGRhdGVTdHI8VD4gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59O1xuXG5leHBvcnQgdHlwZSBVcGRhdGVOdW08VD4gPSB7XG4gIGlkOiBudW1iZXI7XG4gIGNoYW5nZXM6IFBhcnRpYWw8VD47XG59O1xuXG5leHBvcnQgdHlwZSBVcGRhdGU8VD4gPSBVcGRhdGVTdHI8VD4gfCBVcGRhdGVOdW08VD47XG5cbmV4cG9ydCBpbnRlcmZhY2UgRW50aXR5U3RhdGU8VD4ge1xuICBpZHM6IHN0cmluZ1tdIHwgbnVtYmVyW107XG4gIGVudGl0aWVzOiBEaWN0aW9uYXJ5PFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eURlZmluaXRpb248VD4ge1xuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPjtcbiAgc29ydENvbXBhcmVyOiBmYWxzZSB8IENvbXBhcmVyPFQ+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eVN0YXRlQWRhcHRlcjxUPiB7XG4gIGFkZE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICBhZGRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xuICBhZGRBbGw8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+PihlbnRpdGllczogVFtdLCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBzdHJpbmcsIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlT25lPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5OiBudW1iZXIsIHN0YXRlOiBTKTogUztcblxuICByZW1vdmVNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oa2V5czogc3RyaW5nW10sIHN0YXRlOiBTKTogUztcbiAgcmVtb3ZlTWFueTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGtleXM6IG51bWJlcltdLCBzdGF0ZTogUyk6IFM7XG5cbiAgcmVtb3ZlQWxsPFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oc3RhdGU6IFMpOiBTO1xuXG4gIHVwZGF0ZU9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KHVwZGF0ZTogVXBkYXRlPFQ+LCBzdGF0ZTogUyk6IFM7XG4gIHVwZGF0ZU1hbnk8UyBleHRlbmRzIEVudGl0eVN0YXRlPFQ+Pih1cGRhdGVzOiBVcGRhdGU8VD5bXSwgc3RhdGU6IFMpOiBTO1xuXG4gIHVwc2VydE9uZTxTIGV4dGVuZHMgRW50aXR5U3RhdGU8VD4+KGVudGl0eTogVCwgc3RhdGU6IFMpOiBTO1xuICB1cHNlcnRNYW55PFMgZXh0ZW5kcyBFbnRpdHlTdGF0ZTxUPj4oZW50aXRpZXM6IFRbXSwgc3RhdGU6IFMpOiBTO1xufVxuXG5leHBvcnQgdHlwZSBFbnRpdHlTZWxlY3RvcnM8VCwgVj4gPSB7XG4gIHNlbGVjdElkczogKHN0YXRlOiBWKSA9PiBzdHJpbmdbXSB8IG51bWJlcltdO1xuICBzZWxlY3RFbnRpdGllczogKHN0YXRlOiBWKSA9PiBEaWN0aW9uYXJ5PFQ+O1xuICBzZWxlY3RBbGw6IChzdGF0ZTogVikgPT4gVFtdO1xuICBzZWxlY3RUb3RhbDogKHN0YXRlOiBWKSA9PiBudW1iZXI7XG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIEVudGl0eUFkYXB0ZXI8VD4gZXh0ZW5kcyBFbnRpdHlTdGF0ZUFkYXB0ZXI8VD4ge1xuICBzZWxlY3RJZDogSWRTZWxlY3RvcjxUPjtcbiAgc29ydENvbXBhcmVyOiBmYWxzZSB8IENvbXBhcmVyPFQ+O1xuICBnZXRJbml0aWFsU3RhdGUoKTogRW50aXR5U3RhdGU8VD47XG4gIGdldEluaXRpYWxTdGF0ZTxTIGV4dGVuZHMgb2JqZWN0PihzdGF0ZTogUyk6IEVudGl0eVN0YXRlPFQ+ICYgUztcbiAgZ2V0U2VsZWN0b3JzKCk6IEVudGl0eVNlbGVjdG9yczxULCBFbnRpdHlTdGF0ZTxUPj47XG4gIGdldFNlbGVjdG9yczxWPihcbiAgICBzZWxlY3RTdGF0ZTogKHN0YXRlOiBWKSA9PiBFbnRpdHlTdGF0ZTxUPlxuICApOiBFbnRpdHlTZWxlY3RvcnM8VCwgVj47XG59XG4iXX0=