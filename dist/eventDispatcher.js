var EventDispatcher;
(EventDispatcher = function () {
}).prototype = {
    subscribe: function (type, method, scope, context) {
        var listeners, handlers;

        function generateGuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        var self = this;
        if (!(listeners = this.listeners)) {
            listeners = this.listeners = {};
        }
        if (!(handlers = listeners[type])) {
            handlers = listeners[type] = [];
        }
        scope = (scope ? scope : window);
        var id = generateGuid();
        handlers.push({
            id: id,
            method: method,
            scope: scope,
            context: (context ? context : scope)
        });
        return function () {
            self.unSubscribe(type, id);
        };
    },
    hasSubscribers: function (type) {
        return this.listeners && this.listeners[type] && this.listeners[type].length > 0;
    },
    unSubscribe: function (type, id) {
        var i = this.listeners[type].length;
        var handler = null;
        while (!handler && i--) {
            if (this.listeners[type][i].id === id) {
                handler = this.listeners[type][i];
            }
        }
        if (!handler) {
            return;
        }
        this.listeners[type].splice(i, 1);
    },
    trigger: function (type, data, context) {
        var listeners = this.listeners, i, n, handler;
        data = data instanceof Array ? data : [data];
        if (!listeners) {
            return;
        }
        ;
        var handlers = listeners[type];
        if (!handlers) {
            return;
        }
        for (i = 0, n = handlers.length; i < n; i++) {
            handler = handlers[i];
            if ((typeof (context) !== "undefined" && context !== handler.context) || !handler) {
                continue;
            }
            if (handler.method.apply(handler.scope, data) === false) {
                return false;
            }
        }
        return true;
    },
    dispose: function () {
        for (var listener in this.listeners) {
            if (this.listeners[listener] && this.listeners[listener] instanceof Array)
                this.listeners[listener].length = 0;
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50ZGlzcGF0Y2hlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImV2ZW50RGlzcGF0Y2hlci5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBFdmVudERpc3BhdGNoZXI7XHJcbihFdmVudERpc3BhdGNoZXIgPSBmdW5jdGlvbiAoKSB7XHJcbn0pLnByb3RvdHlwZSA9IHtcclxuICAgIHN1YnNjcmliZTogZnVuY3Rpb24gKHR5cGUsIG1ldGhvZCwgc2NvcGUsIGNvbnRleHQpIHtcclxuICAgICAgICB2YXIgbGlzdGVuZXJzLCBoYW5kbGVycztcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVHdWlkKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2LnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKCEobGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghKGhhbmRsZXJzID0gbGlzdGVuZXJzW3R5cGVdKSkge1xyXG4gICAgICAgICAgICBoYW5kbGVycyA9IGxpc3RlbmVyc1t0eXBlXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzY29wZSA9IChzY29wZSA/IHNjb3BlIDogd2luZG93KTtcclxuICAgICAgICB2YXIgaWQgPSBnZW5lcmF0ZUd1aWQoKTtcclxuICAgICAgICBoYW5kbGVycy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcclxuICAgICAgICAgICAgc2NvcGU6IHNjb3BlLFxyXG4gICAgICAgICAgICBjb250ZXh0OiAoY29udGV4dCA/IGNvbnRleHQgOiBzY29wZSlcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnVuU3Vic2NyaWJlKHR5cGUsIGlkKTtcclxuICAgICAgICB9O1xyXG4gICAgfSxcclxuICAgIGhhc1N1YnNjcmliZXJzOiBmdW5jdGlvbiAodHlwZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVycyAmJiB0aGlzLmxpc3RlbmVyc1t0eXBlXSAmJiB0aGlzLmxpc3RlbmVyc1t0eXBlXS5sZW5ndGggPiAwO1xyXG4gICAgfSxcclxuICAgIHVuU3Vic2NyaWJlOiBmdW5jdGlvbiAodHlwZSwgaWQpIHtcclxuICAgICAgICB2YXIgaSA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmxlbmd0aDtcclxuICAgICAgICB2YXIgaGFuZGxlciA9IG51bGw7XHJcbiAgICAgICAgd2hpbGUgKCFoYW5kbGVyICYmIGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbdHlwZV1baV0uaWQgPT09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyID0gdGhpcy5saXN0ZW5lcnNbdHlwZV1baV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0uc3BsaWNlKGksIDEpO1xyXG4gICAgfSxcclxuICAgIHRyaWdnZXI6IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBjb250ZXh0KSB7XHJcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLCBpLCBuLCBoYW5kbGVyO1xyXG4gICAgICAgIGRhdGEgPSBkYXRhIGluc3RhbmNlb2YgQXJyYXkgPyBkYXRhIDogW2RhdGFdO1xyXG4gICAgICAgIGlmICghbGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgO1xyXG4gICAgICAgIHZhciBoYW5kbGVycyA9IGxpc3RlbmVyc1t0eXBlXTtcclxuICAgICAgICBpZiAoIWhhbmRsZXJzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChpID0gMCwgbiA9IGhhbmRsZXJzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBoYW5kbGVyID0gaGFuZGxlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICgodHlwZW9mIChjb250ZXh0KSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb250ZXh0ICE9PSBoYW5kbGVyLmNvbnRleHQpIHx8ICFoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5tZXRob2QuYXBwbHkoaGFuZGxlci5zY29wZSwgZGF0YSkgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9LFxyXG4gICAgZGlzcG9zZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZvciAodmFyIGxpc3RlbmVyIGluIHRoaXMubGlzdGVuZXJzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tsaXN0ZW5lcl0gJiYgdGhpcy5saXN0ZW5lcnNbbGlzdGVuZXJdIGluc3RhbmNlb2YgQXJyYXkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1tsaXN0ZW5lcl0ubGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9