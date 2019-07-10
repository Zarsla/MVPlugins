/*:
@name: Zarsla's Param Rate Plus
@plugindesc v 1.00 Adds a function to alter the  Param Rate
@author Zarsla

@help

The Parameter Rate is the the value you
see in the database, in the traits section,
under param, under parameter. Where
you can alter the base parameters
by changing that percentacge value.

This plugin gives you the ability, to
manipulate that param rate just as
you would flat base parameters in game.

Parameter Ids
0 - mhp (max hit points)
1 - mmp (max magic points)
2 - atk (attack)
3 - def (defense)
4 - mat (magic attack)
5 - mdf (magic defense)
6 - agi (agility)
7 - luk (luck)


Plugin Commands:
    IncreaseParamRateActor x y z
    Ex: IncreaseParamRateActor 1 0 10
    Increases parameter 0 rate, aka max hp,
    for actor 1 by 10%

    IncreaseParamRateMember x y z
    Ex: IncreaseParamRateMember 2 1 15
    Increases parameter rate 1, aka max mp,
    for the second party member by 15%

    DecreaseParamRateActor x y z
    Ex: DecreaseParamRateActor 3 2 5
    Decreases parameter rate 2, aka attack rate,
    for actor 3 by 5%

    DecreaseParamRateMember x y z
    Ex: DecreaseParamRateMember 4 4 20
    Decreases parameter rate 4, aka defense rate, 
    for the fourth party member by 20%		


Changelog
  v 1.0 plugin created!

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

var parameters = JSONSuperParse(PluginManager.parameters('Zar_ParameterRatePlus'));

var ZPRP = ZPRP || [];

ZPRP.Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ZPRP.Game_Interpreter_prototype_pluginCommand.call(this, command, args);
    // to be overridden by plugins
    if(command === 'IncreaseParamRateActor'){
    		args[2] *= 0.01;
    		$gameActors.actor(args[0]).addParamRate(args[1], args[2]);
    } else if(command === 'IncreaseParamRateMember'){
    		args[0] -= 1;
    		args[2] *= 0.01;
    		$gameParty.members()[args[0]].addParamRate(args[1], args[2]);
    } else if(command === 'DecreaseParamRateActor'){
    		args[2] *= -0.01;
    		$gameActors.actor(args[0]).addParamRate(args[1], args[2]);
    } else if(command === 'DecreaseParamRateMember'){
    		args[0] -= 1;
    		args[2] *= -0.01;
    		$gameParty.members()[args[0]].addParamRate(args[1], args[2]);
    }
};


ZPRP.Game_BattlerBase_prototype_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    ZPRP.Game_BattlerBase_prototype_initMembers.call(this);
    this.clearParamRatePlus();
};

Game_BattlerBase.prototype.clearParamRatePlus = function() {
    this._paramRatePlus = [0,0,0,0,0,0,0,0];
};

ZPRP.Game_BattlerBase_prototype_paramRate = Game_BattlerBase.prototype.paramRate;
Game_BattlerBase.prototype.paramRate = function(paramId) {
	var amount = ZPRP.Game_BattlerBase_prototype_paramRate.call(this, paramId);
	amount += this.paramRatePlus(paramId);
    return amount; 
};

Game_BattlerBase.prototype.paramRatePlus = function(paramId) {
    return this._paramRatePlus[paramId];
};

Game_BattlerBase.prototype.addParamRate = function(paramId, value) {
    this._paramRatePlus[paramId] += value;
    this.refresh();
};
