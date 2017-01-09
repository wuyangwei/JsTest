/*
*   牌组模型 有效的一组牌
*/

var CardGroup = {};
micoo.CardGroup = CardGroup;

// 有效的一手牌(牌组-cg)
CardGroup.cardgroup = cc.Class.extend({
    kind:null,
    cards:null,
    ctor:function(kind, cards) {
        cc.asset(CardGroup.isCgType(kind), 'kind is not object of CardGroup.base');
        cc.asset(cc.isArray(cards), 'cards is not object of Array');
        this.kind = kind;
        this.cards = cards;
    },
    // @return 一组牌的编码数组
    codes:function() {
        var cs = [];
        for (var i = 0; i < this.cards.length; i++) {
            cs.push(this.cards[i].code);
        }
        return cs;
    }
});

// 判断是否是有效牌型类
CardGroup.CARD_TYPE_NAME = 'CardGroup.CARD_TYPE';
CardGroup.isCgType = function (o) {
    return o._type_id_ == CardGroup.CARD_TYPE_NAME && o.kindId;
};

/*所有可用的牌型列举实现*/
// 有效的一手牌的类型基类
CardGroup.base = cc.Class.extend({
    kindId:null,
    ctor:function(kindId) {
        this._type_id_ = CardGroup.CARD_TYPE_NAME, // 用于判断是否是继承了该类型
        this.kindId = kindId;
    },
    // 检查一组牌是否能构成当前类型
    checkKindWithCards:function(cards) {
		cc.error('kindId:' + kindId + ' checkKindWithCards not implement');
    },
    // 检查一组牌编码是否能构成当前类型
    checkKindWithCodes:function(codes) {
		cc.error('kindId:' + kindId + ' checkKindWithCodes not implement');
    },
    // 生成当前类型的牌组
    cgWithCodes:function(codes) {
		cc.error('kindId:' + kindId + ' cgWithCodes not implement');
    },
    // 对当前牌型的牌组的牌排序
    sortCards:function(cards) {
		cc.error('kindId:' + kindId + ' sortCards not implement');
    },
});
// 单张
CardGroup.single = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '1');
    }
});
// 对子
CardGroup.pair = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '2');
    }
});
// 三张
CardGroup.three = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '3');
    }
});
// 三带一
CardGroup.three1 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '31');
    }
});
// 三带一对
CardGroup.three2 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '32');
    }
});
// 顺子基类
CardGroup.straightBase = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this);
    }
});
// 顺子
CardGroup.straight1 = CardGroup.straightBase.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '123');
    }
});
// 连对
CardGroup.straight2 = CardGroup.straightBase.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '222');
    }
});
// 飞机
CardGroup.straight3 = CardGroup.straightBase.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '33');
    }
});
// 飞机带翅膀-带单张
CardGroup.threes1 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '3311');
    }
});
// 飞机带翅膀-带对子
CardGroup.threes2 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '3322');
    }
});
// 四带两张
CardGroup.four11 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '411');
    }
});
// 四带两对
CardGroup.four22 = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, '422');
    }
});
// 炸弹
CardGroup.bomb = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, 'bomb');
    }
});
// 火箭
CardGroup.rocket = CardGroup.base.extend({
    ctor:function() {
        CardGroup.base.prototype.ctor.call(this, 'rocket');
    }
});