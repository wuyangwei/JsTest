/*
*   事件类
*/



micoo.observer = cc.Class.extend({
    eventlist:null,
    ctor:function() {
        this.eventlist = {};
    },
    on:function(eventname, obj, cb) {
        this.eventlist[eventname] = this.eventlist[eventname] || [];
        this.eventlist[eventname].push({cb:cb,obj:obj});
    },
    off:function() {
        this.eventlist = {};
    },
    fire:function(eventname, params) {
        var cbs = this.eventlist[eventname] || [];
        for (var i = 0; i < cbs.length; i++) {
            var obj = cbs[i].obj;
            var cb = cbs[i].cb;
            cb.call(obj, params);
        }
    },
});