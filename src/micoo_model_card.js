/*
* 牌模型
*/

var Card = {};

// 牌类型（花色）
Card.TYPE = { 
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

/*
*	牌规则基类 - 所有的牌由rule生成
*/
Card.rule = cc.Class.extend({
	nums:[],
	ctor:function() {

	},
	// @override
	num2type:function(num) {
		cc.error('rule.num2type not implement');
	},
	// @override
	num2point:function(num) {
		cc.error('rule.num2point not implement');
	},
	// @override
	createCard:function(num) {
		cc.error('rule.createCard not implement');
	},
	// @final
	isLegal:function(num) {
		return nums.indexOf(num) != -1;
	},
});

/*
*	扑克牌基类
*	@num(param)		牌的唯一编号
*	@type(param)	牌类型（花色）
*	@point(param)	牌点子
*	@rule(param)	牌遵循的规则
*/
Card.base = cc.Class.extend({
	num:null,
	type:Card.TYPE.Idle,
	point:Card.POINT.Idle,
	rule:null,
	ctor:function(num, rule){
		var self = this;
		self.rule = rule;
		self.type = rule.num2type(num);
		self.point = rule.num2point(num);
	},
});

micoo.card = Card;