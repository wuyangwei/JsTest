/*
*	牌模型
*/

var Card = {};
micoo.Card = Card;

// 牌类型（花色）
Card.SUIT = { 
	Spade:3,	// 黑桃
	Heart:2,	// 红桃
	Club:1,		// 梅花
	Diamond:0	// 方块
};

/*
*	牌规则基类 - 所有的牌由rule生成
*	1、牌的编码规则code的二进制[0,1]两位为花色[2,5]四位为点子
*/
Card.rule = cc.Class.extend({
	codes:[], // 一局牌的所有牌的编码
	ctor:function(codes) {
		this.codes = codes;
	},
	// @override
	code2suit:function(code) {
        return code & 0x3;
	},
	// @override
	code2point:function(code) {
		return (code >> 2) & 0xF;
	},
	// @override 生成牌的规则
	_card:function(code) {
		cc.error('rule._card not implement');
	},
	// @fimal
	createCard:function(code) {
		cc.assert(this.isLegal(code), code + " is not legal.");
		return this._card(code);
	},
	// @override
	isLegal:function(code) {
		return this.codes.indexOf(code) != -1;
	},
});

/*
*	扑克牌基类
*	@code	牌的唯一编号
*	@suit 	牌花色
*	@point	牌点子
*/
Card.base = cc.Class.extend({
	code:null,	// 编码
	suit:null,	// 花色
	point:null,	// 点子
	ctor:function(code, rule){
		var self = this;
		self.code = code;
		self.suit = rule.code2suit(code);
		self.point = rule.code2point(code);
	}
});