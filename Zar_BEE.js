/*:
@name: Zarsla's Bonus Enemy Exp
@plugindesc A Simple Bonus Exp
@author Zarsla

@help

A simple plugin that lets you have bonus exp for enemies.
Each exp bonus is for each enemy you face.

To change the exp of enemies you'll need to use the script calls

Script Calls:
enemy.bonusExp();
Returns the script call or evaulation needed for bonus
exp.

enemy.setBonusExp(value);
sets the bonus exp variable to a specfic value

for example:
A state that doubles an enemies exp:

Use yanfly buff states core:

apply notetag:
var inc = enmey.enemy().exp
enemy.setBonusExp(inc);

remove notetag:
var inc = 0;
enemy.setBonusExp(inc);


ToS:
Credit Zarsla, you can do as you wish with this.

*/
var JSONSuperParse = function (string) {
    var temp;
    try {
        temp = JsonEx.parse(typeof string === 'object' ? JsonEx.stringify(string) : string);
    } catch (e) {
        return string;
    }
    if (typeof temp === 'object') {
        Object.keys(temp).forEach(function (key) {
            temp[key] = JSONSuperParse(temp[key]);
            if (temp[key] === '') {
                temp[key] = null;
            }
        });
    }
    return temp;
};

var parameters = JSONSuperParse(PluginManager.parameters('Zar_BEE'));


var ZEE = ZEE || [];

ZEE.Game_Enemy.prototype_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
    ZEE.Game_Enemy.prototype_initMembers.call(this);
    this._bonusExp = 0;
};

Game_Enemy.prototype.bonusExp = function() {
    return this._bonusExp;
};

Game_Enemy.prototype.setBonusExp = function(value) {
	value = Number(eval(value));
    this._bonusExp = value;
};

Game_Enemy.prototype.exp = function() {
    return this.enemy().exp + this.bonusExp();
};

