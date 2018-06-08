/*:
Simple Set Item by Zarsla
@plugindesc v1.0 A simple plugin that sets items.
@author Zarsla
@help

How to use it.
use a script call:
$gameParty.setItem($dataItems[x], y);
where x represent the id of the item and
y represents the amount you want to set it to.

If changing an armor or weapon. use true or false, 
where true means it will inculde equipped weapons or armors, while
false means it will not include equipped weapons or armors.

if you want to inculde equips like so:
$gameParty.setItem($dataWeapons[2], 9, false); 
This will change the number of weapon id 2 to 9
and it will not inculded equipped weapons.

$gameParty.setItem($dataArmors[3], 4, true); 
This will change the number of armor id 3 to 4
and it will inculded equipped armors.

Place this under all item/weapon/armor manipulating plugins.

*/

Game_Party.prototype.setItem = function(item, amount, includeEquip) {
    var container = this.itemContainer(item);
    if (container) {
        var lastNumber = this.numItems(item);
        var newNumber = amount;
        container[item.id] = newNumber.clamp(0, this.maxItems(item));
        if (container[item.id] === 0) {
            delete container[item.id];
        }
        if (includeEquip && newNumber < 0) {
            this.discardMembersEquip(item, -newNumber);
        }
        $gameMap.requestRefresh();
    }
}