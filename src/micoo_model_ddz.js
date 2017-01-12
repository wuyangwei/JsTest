/*
*   斗地主玩法
*/

var ddz = {};
micoo.ddz = ddz;

// 普通牌、癞子牌
ddz.CARD_KIND = {
	Normal:0,
	Laizi:1
};


// 牌点
ddz.CARD_POINT = { 
	Three:0x0,
	Four:0x1,
	Five:0x2,
	Six:0x3,
	Seven:0x4,
	Eight:0x5,
	Nine:0x6,
	Ten:0x7,
	Jake:0x8,
	Queen:0x9,
	King:0xA,
	Ace:0xB,
	Two:0xC,
	Moon:0xD,
	Sun:0xE,
	Flower:0xF
};

ddz.rule = micoo.Card.rule.extend({
	ctor:function(codes) {
        micoo.Card.rule.prototype.ctor.call(this, codes);
	},
	// 普通、癞子
	code2kind:function(code) {
        return code > 0x3F ? ddz.CARD_KIND.Laizi : ddz.CARD_KIND.Normal;
	},
    // 癞子牌变化之后的点子
    code2pointDis:function(code) {
        return code > 0x3F ? code >> 6 : null;
	},
	// @override 生成牌
	_card:function(code) {
        return new ddz.card(code, this);
	},
	// @override
	isLegal:function(code) {
		return this.codes.indexOf(code & 0x3F) != -1;
	},
});

// 地主 牌
ddz.card = micoo.Card.base.extend({
	kind:null,
    pointDis:null, // 如果是
	ctor:function(code, rule){
        micoo.Card.base.prototype.ctor.call(this, code, rule);
		var self = this;
		self.kind = rule.code2kind(code);
        self.pointDis = rule.code2pointDis(code);
	},

	isLaizi:function() {
		return this.kind == ddz.CARD_KIND.Laizi;
	}
});

// 玩法
ddz.playModeBase = cc.Class.extend({
    rule:null,    // 牌规则
    cards:null,   // 所有牌
    codes:null,   // 所有牌编码
    cgKinds:null, // 所有支持的牌型（key-value）
    ctor:function(codes) {
        this.rule = new ddz.rule(codes);
        this.codes = codes;
        this.cards = [];
        for (var i = 0; i < codes.length; i++) {
            var c = new this.rule.createCard(codes[i]);
            this.cards.push(c);
        }
        this.cgKinds = {};
    },

    // 添加牌型
    addCGKind:function(cgKind) {
        cc.asset(micoo.CardGroup.isCgType(cgKind), 'cgKind is not subobject of CardGroup.base');
        if (!this.cgKinds[cgKind.kindId]) {
            this.cgKinds[cgKind.kindId] = cgKind;
        }
    },
});

// 玩家
ddz.player = cc.Class.extend({
    handcards:null,     // 牌数组ddz.cards
    playcards:null,     // 出的牌
    show:null,          // 明牌
    robot:null,         // 托管
    ctor:function() {
        this.handcards = [];
        this.this.playcards = {};
        this.show = false;
        this.robot = false;
    },
    refreshHandcards:function(laiziPoint) {

    },
    addHandcards:function(cards) {

    },
    removeHandcards:function(cards) {

    },
    addPlaycards:function(cg) {

    }
});

// 座位
ddz.seat = cc.Class.extend({
    seatIdx:null,   // 座位编号
    user:null,      // 全局的用户信息
    player:null,    // 玩家牌局信息
    table:null,     // 牌桌
    ctor:function() {

    },
});

// 牌桌
ddz.table = cc.Class.extend({
    playmode:null,  // 玩法
    manager:null,   // 管家
    ai:null,        // AI
    ctor:function() {

    }
});

// 记录牌桌的所有出牌情况
ddz.manager = cc.Class.extend({
    basecards:null,
    dzIdx:null,     // 地主编号
    records:null, // 牌桌出牌记录
    ctor:function() {
        this.records = [];
    },
    record:function(seat, cmd) {
        
    }
});

// 地主的出牌ai
ddz.ai = cc.Class.extend({
    ctor:function() {

    }
});

// 牌桌命令
ddz.cmd = {};
ddz.cmd.CMD_TYPE_NAME = 'ddz.cmd';
ddz.cmd.isCmd = function(o) {
    return o._type_id_ == ddz.CMD_TYPE_NAME && o.action;
};
// 斗地主牌桌的命令基类
ddz.cmd.base = cc.Class.extend({
    action:null,
    steps:null,
    step:null,      // 第几步
    msg:null,
    ctor:function(act) {
        this._type_id_ = ddz.CMD_TYPE_NAME;
        this.action = act;
    }
});

// 开始 - 发牌
ddz.cmd.start = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'start');
        this.steps = ['deal']; // 发牌
    }
});
// 叫牌 - 叫地主+抢地主+叫分
ddz.cmd.call = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'call');
        this.steps = ['who', 'call', 'grab', 'result']; // 提示该谁叫地主
    }
});
// 加倍 - 农民加倍+地主超级加倍
ddz.cmd.double = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'double');
    }
});
// 癞子 - 翻癞子牌
ddz.cmd.laizi = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'laizi');
    }
});
// 换牌 - 开始换牌+玩家换牌+换牌结束
ddz.cmd.swap = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'swap');
    }
});
// 出牌 - 出牌
ddz.cmd.play = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'play');
    }
});
// 结束 - 结束
ddz.cmd.over = ddz.cmd.base.extend({
    ctor:function() {
        ddz.cmd.base.prototype.ctor.call(this, 'over');
    }
});