/*
* 牌模型
*/

var Card = {};
micoo.Card = Card;

// 牌类型（花色）
Card.SUIT = { 
	Idle:-1,
	Spade:0,	// 黑桃
	Heart:1,	// 红桃
	Club:2,		// 梅花
	Diamond:3,	// 方块
	Joker:4,	// 大、小鬼
	Flower:5	// 花牌
};

// 牌点
Card.POINT = { 
	Idle:-1,
	Three:0,
	Four:1,
	Five:2,
	Six:3,
	Seven:4,
	Eight:5,
	Nine:6,
	Ten:7,
	Jake:8,
	Queen:9,
	King:10,
	Ace:11,
	Two:12,
	Moon:13,
	Sun:14,
	Flower:15	// 花牌
};

// 普通牌、万能牌
Card.TYPE = {
	Idle:-1,
	Normal:0,
	Laizi:1
};

/*
*	牌规则基类 - 所有的牌由rule生成
*/
Card.rule = cc.Class.extend({
	codes:[],
	ctor:function(codes) {
		self.codes = codes;
	},
	// @override
	code2type:function(code) {
		cc.error('rule.code2type not implement');
	},
	// @override
	code2suit:function(code) {
		cc.error('rule.code2suit not implement');
	},
	// @override
	code2point:function(code) {
		cc.error('rule.code2point not implement');
	},
	// @override
	_card:function(code) {
		cc.error('rule._card not implement');
	}
	// @fimal
	createCard:function(code) {
		cc.assert(this.isLegal(code), code + " is not legal.");
		return this._card(code);
	},
	// @final
	isLegal:function(code) {
		return codes.indexOf(code) != -1;
	},
});

/*
*	扑克牌基类
*	@code	牌的唯一编号
*	@type	牌类型
*	@suit 	牌花色
*	@point	牌点子
*	@rule	牌遵循的规则
*/
Card.base = cc.Class.extend({
	code:null,
	type:Card.TYPE.Idle,
	suit:Card.SUIT.Idle,
	point:Card.POINT.Idle,
	rule:null,
	ctor:function(code, rule){
		var self = this;
		self.rule = rule;
		self.type = rule.code2type(code);
		self.suit = rule.code2suit(code);
		self.point = rule.code2point(code);
	},

	isJoker:function() {
		return this.suit == Card.SUIT.Joker;
	},

	isLaizi:function() {
		return this.type == Card.TYPE.Laizi;
	}
});