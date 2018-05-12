(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@ngrx/entity/schematics-core/utility/config", ["require", "exports", "@angular-devkit/schematics"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var schematics_1 = require("@angular-devkit/schematics");
    function getWorkspacePath(host) {
        var possibleFiles = ['/angular.json', '/.angular.json'];
        var path = possibleFiles.filter(function (path) { return host.exists(path); })[0];
        return path;
    }
    exports.getWorkspacePath = getWorkspacePath;
    function getWorkspace(host) {
        var path = getWorkspacePath(host);
        var configBuffer = host.read(path);
        if (configBuffer === null) {
            throw new schematics_1.SchematicsException("Could not find (" + path + ")");
        }
        var config = configBuffer.toString();
        return JSON.parse(config);
    }
    exports.getWorkspace = getWorkspace;
    exports.configPath = '/.angular-cli.json';
    function getConfig(host) {
        var configBuffer = host.read(exports.configPath);
        if (configBuffer === null) {
            throw new schematics_1.SchematicsException('Could not find .angular-cli.json');
        }
        var config = JSON.parse(configBuffer.toString());
        return config;
    }
    exports.getConfig = getConfig;
    function getAppFromConfig(config, appIndexOrName) {
        if (!config.apps) {
            return null;
        }
        if (parseInt(appIndexOrName) >= 0) {
            return config.apps[parseInt(appIndexOrName)];
        }
        return config.apps.filter(function (app) { return app.name === appIndexOrName; })[0];
    }
    exports.getAppFromConfig = getAppFromConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9lbnRpdHkvc2NoZW1hdGljcy1jb3JlL3V0aWxpdHkvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEseURBQXVFO0lBMGJ2RSwwQkFBaUMsSUFBVTtRQUN6QyxJQUFNLGFBQWEsR0FBRyxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzFELElBQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFqQixDQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFMRCw0Q0FLQztJQUVELHNCQUE2QixJQUFVO1FBQ3JDLElBQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLHFCQUFtQixJQUFJLE1BQUcsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFDRCxJQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFdkMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQVRELG9DQVNDO0lBRVksUUFBQSxVQUFVLEdBQUcsb0JBQW9CLENBQUM7SUFFL0MsbUJBQTBCLElBQVU7UUFDbEMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBVSxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFDLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLGdDQUFtQixDQUFDLGtDQUFrQyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUVELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBVEQsOEJBU0M7SUFFRCwwQkFDRSxNQUFpQixFQUNqQixjQUFzQjtRQUV0QixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUEzQixDQUEyQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQWJELDRDQWFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NoZW1hdGljc0V4Y2VwdGlvbiwgVHJlZSB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IGV4cGVyaW1lbnRhbCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcblxuLy8gVGhlIGludGVyZmFjZXMgYmVsb3cgYXJlIGdlbmVyYXRlZCBmcm9tIHRoZSBBbmd1bGFyIENMSSBjb25maWd1cmF0aW9uIHNjaGVtYVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvYmxvYi9tYXN0ZXIvcGFja2FnZXMvQGFuZ3VsYXIvY2xpL2xpYi9jb25maWcvc2NoZW1hLmpzb25cbmV4cG9ydCBpbnRlcmZhY2UgQXBwQ29uZmlnIHtcbiAgLyoqXG4gICAqIE5hbWUgb2YgdGhlIGFwcC5cbiAgICovXG4gIG5hbWU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBEaXJlY3Rvcnkgd2hlcmUgYXBwIGZpbGVzIGFyZSBwbGFjZWQuXG4gICAqL1xuICBhcHBSb290Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoZSBhcHAuXG4gICAqL1xuICByb290Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG91dHB1dCBkaXJlY3RvcnkgZm9yIGJ1aWxkIHJlc3VsdHMuXG4gICAqL1xuICBvdXREaXI/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBMaXN0IG9mIGFwcGxpY2F0aW9uIGFzc2V0cy5cbiAgICovXG4gIGFzc2V0cz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBhdHRlcm4gdG8gbWF0Y2guXG4gICAgICAgICAqL1xuICAgICAgICBnbG9iPzogc3RyaW5nO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGRpciB0byBzZWFyY2ggd2l0aGluLlxuICAgICAgICAgKi9cbiAgICAgICAgaW5wdXQ/OiBzdHJpbmc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3V0cHV0IHBhdGggKHJlbGF0aXZlIHRvIHRoZSBvdXREaXIpLlxuICAgICAgICAgKi9cbiAgICAgICAgb3V0cHV0Pzogc3RyaW5nO1xuICAgICAgfSlbXTtcbiAgLyoqXG4gICAqIFVSTCB3aGVyZSBmaWxlcyB3aWxsIGJlIGRlcGxveWVkLlxuICAgKi9cbiAgZGVwbG95VXJsPzogc3RyaW5nO1xuICAvKipcbiAgICogQmFzZSB1cmwgZm9yIHRoZSBhcHBsaWNhdGlvbiBiZWluZyBidWlsdC5cbiAgICovXG4gIGJhc2VIcmVmPzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIHJ1bnRpbWUgcGxhdGZvcm0gb2YgdGhlIGFwcC5cbiAgICovXG4gIHBsYXRmb3JtPzogJ2Jyb3dzZXInIHwgJ3NlcnZlcic7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgc3RhcnQgSFRNTCBmaWxlLlxuICAgKi9cbiAgaW5kZXg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgbWFpbiBlbnRyeS1wb2ludCBmaWxlLlxuICAgKi9cbiAgbWFpbj86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBwb2x5ZmlsbHMgZmlsZS5cbiAgICovXG4gIHBvbHlmaWxscz86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSB0ZXN0IGVudHJ5LXBvaW50IGZpbGUuXG4gICAqL1xuICB0ZXN0Pzogc3RyaW5nO1xuICAvKipcbiAgICogVGhlIG5hbWUgb2YgdGhlIFR5cGVTY3JpcHQgY29uZmlndXJhdGlvbiBmaWxlLlxuICAgKi9cbiAgdHNjb25maWc/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgbmFtZSBvZiB0aGUgVHlwZVNjcmlwdCBjb25maWd1cmF0aW9uIGZpbGUgZm9yIHVuaXQgdGVzdHMuXG4gICAqL1xuICB0ZXN0VHNjb25maWc/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgcHJlZml4IHRvIGFwcGx5IHRvIGdlbmVyYXRlZCBzZWxlY3RvcnMuXG4gICAqL1xuICBwcmVmaXg/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBFeHBlcmltZW50YWwgc3VwcG9ydCBmb3IgYSBzZXJ2aWNlIHdvcmtlciBmcm9tIEBhbmd1bGFyL3NlcnZpY2Utd29ya2VyLlxuICAgKi9cbiAgc2VydmljZVdvcmtlcj86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBHbG9iYWwgc3R5bGVzIHRvIGJlIGluY2x1ZGVkIGluIHRoZSBidWlsZC5cbiAgICovXG4gIHN0eWxlcz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBpbnB1dD86IHN0cmluZztcbiAgICAgICAgW25hbWU6IHN0cmluZ106IGFueTsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1hbnlcbiAgICAgIH0pW107XG4gIC8qKlxuICAgKiBPcHRpb25zIHRvIHBhc3MgdG8gc3R5bGUgcHJlcHJvY2Vzc29yc1xuICAgKi9cbiAgc3R5bGVQcmVwcm9jZXNzb3JPcHRpb25zPzoge1xuICAgIC8qKlxuICAgICAqIFBhdGhzIHRvIGluY2x1ZGUuIFBhdGhzIHdpbGwgYmUgcmVzb2x2ZWQgdG8gcHJvamVjdCByb290LlxuICAgICAqL1xuICAgIGluY2x1ZGVQYXRocz86IHN0cmluZ1tdO1xuICB9O1xuICAvKipcbiAgICogR2xvYmFsIHNjcmlwdHMgdG8gYmUgaW5jbHVkZWQgaW4gdGhlIGJ1aWxkLlxuICAgKi9cbiAgc2NyaXB0cz86IChcbiAgICB8IHN0cmluZ1xuICAgIHwge1xuICAgICAgICBpbnB1dDogc3RyaW5nO1xuICAgICAgICBbbmFtZTogc3RyaW5nXTogYW55OyAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLWFueVxuICAgICAgfSlbXTtcbiAgLyoqXG4gICAqIFNvdXJjZSBmaWxlIGZvciBlbnZpcm9ubWVudCBjb25maWcuXG4gICAqL1xuICBlbnZpcm9ubWVudFNvdXJjZT86IHN0cmluZztcbiAgLyoqXG4gICAqIE5hbWUgYW5kIGNvcnJlc3BvbmRpbmcgZmlsZSBmb3IgZW52aXJvbm1lbnQgY29uZmlnLlxuICAgKi9cbiAgZW52aXJvbm1lbnRzPzoge1xuICAgIFtuYW1lOiBzdHJpbmddOiBhbnk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYW55XG4gIH07XG4gIGFwcFNoZWxsPzoge1xuICAgIGFwcDogc3RyaW5nO1xuICAgIHJvdXRlOiBzdHJpbmc7XG4gIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpQ29uZmlnIHtcbiAgJHNjaGVtYT86IHN0cmluZztcbiAgLyoqXG4gICAqIFRoZSBnbG9iYWwgY29uZmlndXJhdGlvbiBvZiB0aGUgcHJvamVjdC5cbiAgICovXG4gIHByb2plY3Q/OiB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHByb2plY3QuXG4gICAgICovXG4gICAgbmFtZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIG9yIG5vdCB0aGlzIHByb2plY3Qgd2FzIGVqZWN0ZWQuXG4gICAgICovXG4gICAgZWplY3RlZD86IGJvb2xlYW47XG4gIH07XG4gIC8qKlxuICAgKiBQcm9wZXJ0aWVzIG9mIHRoZSBkaWZmZXJlbnQgYXBwbGljYXRpb25zIGluIHRoaXMgcHJvamVjdC5cbiAgICovXG4gIGFwcHM/OiBBcHBDb25maWdbXTtcbiAgLyoqXG4gICAqIENvbmZpZ3VyYXRpb24gZm9yIGVuZC10by1lbmQgdGVzdHMuXG4gICAqL1xuICBlMmU/OiB7XG4gICAgcHJvdHJhY3Rvcj86IHtcbiAgICAgIC8qKlxuICAgICAgICogUGF0aCB0byB0aGUgY29uZmlnIGZpbGUuXG4gICAgICAgKi9cbiAgICAgIGNvbmZpZz86IHN0cmluZztcbiAgICB9O1xuICB9O1xuICAvKipcbiAgICogUHJvcGVydGllcyB0byBiZSBwYXNzZWQgdG8gVFNMaW50LlxuICAgKi9cbiAgbGludD86IHtcbiAgICAvKipcbiAgICAgKiBGaWxlIGdsb2IocykgdG8gbGludC5cbiAgICAgKi9cbiAgICBmaWxlcz86IHN0cmluZyB8IHN0cmluZ1tdO1xuICAgIC8qKlxuICAgICAqIExvY2F0aW9uIG9mIHRoZSB0c2NvbmZpZy5qc29uIHByb2plY3QgZmlsZS5cbiAgICAgKiBXaWxsIGFsc28gdXNlIGFzIGZpbGVzIHRvIGxpbnQgaWYgJ2ZpbGVzJyBwcm9wZXJ0eSBub3QgcHJlc2VudC5cbiAgICAgKi9cbiAgICBwcm9qZWN0OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogTG9jYXRpb24gb2YgdGhlIHRzbGludC5qc29uIGNvbmZpZ3VyYXRpb24uXG4gICAgICovXG4gICAgdHNsaW50Q29uZmlnPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEZpbGUgZ2xvYihzKSB0byBpZ25vcmUuXG4gICAgICovXG4gICAgZXhjbHVkZT86IHN0cmluZyB8IHN0cmluZ1tdO1xuICB9W107XG4gIC8qKlxuICAgKiBDb25maWd1cmF0aW9uIGZvciB1bml0IHRlc3RzLlxuICAgKi9cbiAgdGVzdD86IHtcbiAgICBrYXJtYT86IHtcbiAgICAgIC8qKlxuICAgICAgICogUGF0aCB0byB0aGUga2FybWEgY29uZmlnIGZpbGUuXG4gICAgICAgKi9cbiAgICAgIGNvbmZpZz86IHN0cmluZztcbiAgICB9O1xuICAgIGNvZGVDb3ZlcmFnZT86IHtcbiAgICAgIC8qKlxuICAgICAgICogR2xvYnMgdG8gZXhjbHVkZSBmcm9tIGNvZGUgY292ZXJhZ2UuXG4gICAgICAgKi9cbiAgICAgIGV4Y2x1ZGU/OiBzdHJpbmdbXTtcbiAgICB9O1xuICB9O1xuICAvKipcbiAgICogU3BlY2lmeSB0aGUgZGVmYXVsdCB2YWx1ZXMgZm9yIGdlbmVyYXRpbmcuXG4gICAqL1xuICBkZWZhdWx0cz86IHtcbiAgICAvKipcbiAgICAgKiBUaGUgZmlsZSBleHRlbnNpb24gdG8gYmUgdXNlZCBmb3Igc3R5bGUgZmlsZXMuXG4gICAgICovXG4gICAgc3R5bGVFeHQ/OiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogSG93IG9mdGVuIHRvIGNoZWNrIGZvciBmaWxlIHVwZGF0ZXMuXG4gICAgICovXG4gICAgcG9sbD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBVc2UgbGludCB0byBmaXggZmlsZXMgYWZ0ZXIgZ2VuZXJhdGlvblxuICAgICAqL1xuICAgIGxpbnRGaXg/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgYSBjbGFzcy5cbiAgICAgKi9cbiAgICBjbGFzcz86IHtcbiAgICAgIC8qKlxuICAgICAgICogU3BlY2lmaWVzIGlmIGEgc3BlYyBmaWxlIGlzIGdlbmVyYXRlZC5cbiAgICAgICAqL1xuICAgICAgc3BlYz86IGJvb2xlYW47XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPcHRpb25zIGZvciBnZW5lcmF0aW5nIGEgY29tcG9uZW50LlxuICAgICAqL1xuICAgIGNvbXBvbmVudD86IHtcbiAgICAgIC8qKlxuICAgICAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgICAgICovXG4gICAgICBmbGF0PzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogU3BlY2lmaWVzIGlmIGEgc3BlYyBmaWxlIGlzIGdlbmVyYXRlZC5cbiAgICAgICAqL1xuICAgICAgc3BlYz86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFNwZWNpZmllcyBpZiB0aGUgc3R5bGUgd2lsbCBiZSBpbiB0aGUgdHMgZmlsZS5cbiAgICAgICAqL1xuICAgICAgaW5saW5lU3R5bGU/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgaWYgdGhlIHRlbXBsYXRlIHdpbGwgYmUgaW4gdGhlIHRzIGZpbGUuXG4gICAgICAgKi9cbiAgICAgIGlubGluZVRlbXBsYXRlPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogU3BlY2lmaWVzIHRoZSB2aWV3IGVuY2Fwc3VsYXRpb24gc3RyYXRlZ3kuXG4gICAgICAgKi9cbiAgICAgIHZpZXdFbmNhcHN1bGF0aW9uPzogJ0VtdWxhdGVkJyB8ICdOYXRpdmUnIHwgJ05vbmUnO1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgdGhlIGNoYW5nZSBkZXRlY3Rpb24gc3RyYXRlZ3kuXG4gICAgICAgKi9cbiAgICAgIGNoYW5nZURldGVjdGlvbj86ICdEZWZhdWx0JyB8ICdPblB1c2gnO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgZ2VuZXJhdGluZyBhIGRpcmVjdGl2ZS5cbiAgICAgKi9cbiAgICBkaXJlY3RpdmU/OiB7XG4gICAgICAvKipcbiAgICAgICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICAgICAqL1xuICAgICAgZmxhdD86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFNwZWNpZmllcyBpZiBhIHNwZWMgZmlsZSBpcyBnZW5lcmF0ZWQuXG4gICAgICAgKi9cbiAgICAgIHNwZWM/OiBib29sZWFuO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgZ2VuZXJhdGluZyBhIGd1YXJkLlxuICAgICAqL1xuICAgIGd1YXJkPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBGbGFnIHRvIGluZGljYXRlIGlmIGEgZGlyIGlzIGNyZWF0ZWQuXG4gICAgICAgKi9cbiAgICAgIGZsYXQ/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgICAgICovXG4gICAgICBzcGVjPzogYm9vbGVhbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgYW4gaW50ZXJmYWNlLlxuICAgICAqL1xuICAgIGludGVyZmFjZT86IHtcbiAgICAgIC8qKlxuICAgICAgICogUHJlZml4IHRvIGFwcGx5IHRvIGludGVyZmFjZSBuYW1lcy4gKGkuZS4gSSlcbiAgICAgICAqL1xuICAgICAgcHJlZml4Pzogc3RyaW5nO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgZ2VuZXJhdGluZyBhIG1vZHVsZS5cbiAgICAgKi9cbiAgICBtb2R1bGU/OiB7XG4gICAgICAvKipcbiAgICAgICAqIEZsYWcgdG8gaW5kaWNhdGUgaWYgYSBkaXIgaXMgY3JlYXRlZC5cbiAgICAgICAqL1xuICAgICAgZmxhdD86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFNwZWNpZmllcyBpZiBhIHNwZWMgZmlsZSBpcyBnZW5lcmF0ZWQuXG4gICAgICAgKi9cbiAgICAgIHNwZWM/OiBib29sZWFuO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmb3IgZ2VuZXJhdGluZyBhIHBpcGUuXG4gICAgICovXG4gICAgcGlwZT86IHtcbiAgICAgIC8qKlxuICAgICAgICogRmxhZyB0byBpbmRpY2F0ZSBpZiBhIGRpciBpcyBjcmVhdGVkLlxuICAgICAgICovXG4gICAgICBmbGF0PzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogU3BlY2lmaWVzIGlmIGEgc3BlYyBmaWxlIGlzIGdlbmVyYXRlZC5cbiAgICAgICAqL1xuICAgICAgc3BlYz86IGJvb2xlYW47XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPcHRpb25zIGZvciBnZW5lcmF0aW5nIGEgc2VydmljZS5cbiAgICAgKi9cbiAgICBzZXJ2aWNlPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBGbGFnIHRvIGluZGljYXRlIGlmIGEgZGlyIGlzIGNyZWF0ZWQuXG4gICAgICAgKi9cbiAgICAgIGZsYXQ/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgaWYgYSBzcGVjIGZpbGUgaXMgZ2VuZXJhdGVkLlxuICAgICAgICovXG4gICAgICBzcGVjPzogYm9vbGVhbjtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFByb3BlcnRpZXMgdG8gYmUgcGFzc2VkIHRvIHRoZSBidWlsZCBjb21tYW5kLlxuICAgICAqL1xuICAgIGJ1aWxkPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBPdXRwdXQgc291cmNlbWFwcy5cbiAgICAgICAqL1xuICAgICAgc291cmNlbWFwcz86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIEJhc2UgdXJsIGZvciB0aGUgYXBwbGljYXRpb24gYmVpbmcgYnVpbHQuXG4gICAgICAgKi9cbiAgICAgIGJhc2VIcmVmPzogc3RyaW5nO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc3NsIGtleSB1c2VkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICAgKi9cbiAgICAgIHByb2dyZXNzPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogRW5hYmxlIGFuZCBkZWZpbmUgdGhlIGZpbGUgd2F0Y2hpbmcgcG9sbCB0aW1lIHBlcmlvZCAobWlsbGlzZWNvbmRzKS5cbiAgICAgICAqL1xuICAgICAgcG9sbD86IG51bWJlcjtcbiAgICAgIC8qKlxuICAgICAgICogRGVsZXRlIG91dHB1dCBwYXRoIGJlZm9yZSBidWlsZC5cbiAgICAgICAqL1xuICAgICAgZGVsZXRlT3V0cHV0UGF0aD86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIERvIG5vdCB1c2UgdGhlIHJlYWwgcGF0aCB3aGVuIHJlc29sdmluZyBtb2R1bGVzLlxuICAgICAgICovXG4gICAgICBwcmVzZXJ2ZVN5bWxpbmtzPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogU2hvdyBjaXJjdWxhciBkZXBlbmRlbmN5IHdhcm5pbmdzIG9uIGJ1aWxkcy5cbiAgICAgICAqL1xuICAgICAgc2hvd0NpcmN1bGFyRGVwZW5kZW5jaWVzPzogYm9vbGVhbjtcbiAgICAgIC8qKlxuICAgICAgICogVXNlIGEgc2VwYXJhdGUgYnVuZGxlIGNvbnRhaW5pbmcgY29kZSB1c2VkIGFjcm9zcyBtdWx0aXBsZSBidW5kbGVzLlxuICAgICAgICovXG4gICAgICBjb21tb25DaHVuaz86IGJvb2xlYW47XG4gICAgICAvKipcbiAgICAgICAqIFVzZSBmaWxlIG5hbWUgZm9yIGxhenkgbG9hZGVkIGNodW5rcy5cbiAgICAgICAqL1xuICAgICAgbmFtZWRDaHVua3M/OiBib29sZWFuO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHJvcGVydGllcyB0byBiZSBwYXNzZWQgdG8gdGhlIHNlcnZlIGNvbW1hbmQuXG4gICAgICovXG4gICAgc2VydmU/OiB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBwb3J0IHRoZSBhcHBsaWNhdGlvbiB3aWxsIGJlIHNlcnZlZCBvbi5cbiAgICAgICAqL1xuICAgICAgcG9ydD86IG51bWJlcjtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIGhvc3QgdGhlIGFwcGxpY2F0aW9uIHdpbGwgYmUgc2VydmVkIG9uLlxuICAgICAgICovXG4gICAgICBob3N0Pzogc3RyaW5nO1xuICAgICAgLyoqXG4gICAgICAgKiBFbmFibGVzIHNzbCBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICAgICAgICovXG4gICAgICBzc2w/OiBib29sZWFuO1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgc3NsIGtleSB1c2VkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICAgKi9cbiAgICAgIHNzbEtleT86IHN0cmluZztcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNzbCBjZXJ0aWZpY2F0ZSB1c2VkIGJ5IHRoZSBzZXJ2ZXIuXG4gICAgICAgKi9cbiAgICAgIHNzbENlcnQ/OiBzdHJpbmc7XG4gICAgICAvKipcbiAgICAgICAqIFByb3h5IGNvbmZpZ3VyYXRpb24gZmlsZS5cbiAgICAgICAqL1xuICAgICAgcHJveHlDb25maWc/OiBzdHJpbmc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0aWVzIGFib3V0IHNjaGVtYXRpY3MuXG4gICAgICovXG4gICAgc2NoZW1hdGljcz86IHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIHNjaGVtYXRpY3MgY29sbGVjdGlvbiB0byB1c2UuXG4gICAgICAgKi9cbiAgICAgIGNvbGxlY3Rpb24/OiBzdHJpbmc7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBuZXcgYXBwIHNjaGVtYXRpYy5cbiAgICAgICAqL1xuICAgICAgbmV3QXBwPzogc3RyaW5nO1xuICAgIH07XG4gIH07XG4gIC8qKlxuICAgKiBTcGVjaWZ5IHdoaWNoIHBhY2thZ2UgbWFuYWdlciB0b29sIHRvIHVzZS5cbiAgICovXG4gIHBhY2thZ2VNYW5hZ2VyPzogJ25wbScgfCAnY25wbScgfCAneWFybicgfCAnZGVmYXVsdCc7XG4gIC8qKlxuICAgKiBBbGxvdyBwZW9wbGUgdG8gZGlzYWJsZSBjb25zb2xlIHdhcm5pbmdzLlxuICAgKi9cbiAgd2FybmluZ3M/OiB7XG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgd2hlbiB0aGUgdXNlciBlbmFibGVkIHRoZSAtLWhtciBvcHRpb24uXG4gICAgICovXG4gICAgaG1yV2FybmluZz86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgd2hlbiB0aGUgbm9kZSB2ZXJzaW9uIGlzIGluY29tcGF0aWJsZS5cbiAgICAgKi9cbiAgICBub2RlRGVwcmVjYXRpb24/OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNob3cgYSB3YXJuaW5nIHdoZW4gdGhlIHVzZXIgaW5zdGFsbGVkIGFuZ3VsYXItY2xpLlxuICAgICAqL1xuICAgIHBhY2thZ2VEZXByZWNhdGlvbj86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgd2hlbiB0aGUgZ2xvYmFsIHZlcnNpb24gaXMgbmV3ZXIgdGhhbiB0aGUgbG9jYWwgb25lLlxuICAgICAqL1xuICAgIHZlcnNpb25NaXNtYXRjaD86IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogU2hvdyBhIHdhcm5pbmcgd2hlbiB0aGUgVHlwZVNjcmlwdCB2ZXJzaW9uIGlzIGluY29tcGF0aWJsZVxuICAgICAqL1xuICAgIHR5cGVzY3JpcHRNaXNtYXRjaD86IGJvb2xlYW47XG4gIH07XG59XG5cbmV4cG9ydCB0eXBlIFdvcmtzcGFjZVNjaGVtYSA9IGV4cGVyaW1lbnRhbC53b3Jrc3BhY2UuV29ya3NwYWNlU2NoZW1hO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V29ya3NwYWNlUGF0aChob3N0OiBUcmVlKTogc3RyaW5nIHtcbiAgY29uc3QgcG9zc2libGVGaWxlcyA9IFsnL2FuZ3VsYXIuanNvbicsICcvLmFuZ3VsYXIuanNvbiddO1xuICBjb25zdCBwYXRoID0gcG9zc2libGVGaWxlcy5maWx0ZXIocGF0aCA9PiBob3N0LmV4aXN0cyhwYXRoKSlbMF07XG5cbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXb3Jrc3BhY2UoaG9zdDogVHJlZSk6IFdvcmtzcGFjZVNjaGVtYSB7XG4gIGNvbnN0IHBhdGggPSBnZXRXb3Jrc3BhY2VQYXRoKGhvc3QpO1xuICBjb25zdCBjb25maWdCdWZmZXIgPSBob3N0LnJlYWQocGF0aCk7XG4gIGlmIChjb25maWdCdWZmZXIgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbihgQ291bGQgbm90IGZpbmQgKCR7cGF0aH0pYCk7XG4gIH1cbiAgY29uc3QgY29uZmlnID0gY29uZmlnQnVmZmVyLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIEpTT04ucGFyc2UoY29uZmlnKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNvbmZpZ1BhdGggPSAnLy5hbmd1bGFyLWNsaS5qc29uJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmZpZyhob3N0OiBUcmVlKTogQ2xpQ29uZmlnIHtcbiAgY29uc3QgY29uZmlnQnVmZmVyID0gaG9zdC5yZWFkKGNvbmZpZ1BhdGgpO1xuICBpZiAoY29uZmlnQnVmZmVyID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oJ0NvdWxkIG5vdCBmaW5kIC5hbmd1bGFyLWNsaS5qc29uJyk7XG4gIH1cblxuICBjb25zdCBjb25maWcgPSBKU09OLnBhcnNlKGNvbmZpZ0J1ZmZlci50b1N0cmluZygpKTtcblxuICByZXR1cm4gY29uZmlnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QXBwRnJvbUNvbmZpZyhcbiAgY29uZmlnOiBDbGlDb25maWcsXG4gIGFwcEluZGV4T3JOYW1lOiBzdHJpbmdcbik6IEFwcENvbmZpZyB8IG51bGwge1xuICBpZiAoIWNvbmZpZy5hcHBzKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAocGFyc2VJbnQoYXBwSW5kZXhPck5hbWUpID49IDApIHtcbiAgICByZXR1cm4gY29uZmlnLmFwcHNbcGFyc2VJbnQoYXBwSW5kZXhPck5hbWUpXTtcbiAgfVxuXG4gIHJldHVybiBjb25maWcuYXBwcy5maWx0ZXIoYXBwID0+IGFwcC5uYW1lID09PSBhcHBJbmRleE9yTmFtZSlbMF07XG59XG4iXX0=