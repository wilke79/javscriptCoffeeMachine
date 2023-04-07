const input = require('sync-input')

// console.log("Starting to make a coffee");
// console.log("Grinding coffee beans");
// console.log("Boiling water");
// console.log("Mixing boiled water with crushed coffee beans");
// console.log("Pouring coffee into the cup");
// console.log("Pouring some milk into the cup");
// console.log("Coffee is ready!");

class Speciality {
    name;
    water;
    milk;
    beans;
    price;

    constructor(name, water, milk, beans, price) {
        this.name = name;
        this.water = water;
        this.milk = milk;
        this.beans = beans;
        this.price = price;
    }
}

class CoffeeMachine {
    money;
    water;
    milk;
    coffeeBeans;
    disposableCups;
    specialities = [];

    constructor(money, water, milk, coffeeBeans, disposableCups) {
        this.money = money;
        this.water = water;
        this.milk = milk;
        this.coffeeBeans = coffeeBeans;
        this.disposableCups = disposableCups;
        this.specialities.push(new Speciality('Espresso', 250, 0, 16, 4));
        this.specialities.push(new Speciality('Latte', 350, 75, 20, 7));
        this.specialities.push(new Speciality('Cappuccino', 200, 100, 12, 6));
        //New speciality added
        this.specialities.push(new Speciality('Americano', 350, 0, 16, 4));
    }

    makeCoffee() {
        //Changed menu style to list, Specialities can now easily be added (see above)
        console.log('What do you want to buy? ');
        this.specialities.forEach((speciality, index) => {
            console.log(`${index + 1} - ${speciality.name},`)
        });
        console.log('back - to main menu: ');
        let choice = input();
        if (choice === 'back') {
            return ;
        }
        if (this.water < this.specialities[choice - 1].water) {
            console.log('Sorry, not enough water!');
            return;
        }
        if (this.milk < this.specialities[choice - 1].milk) {
            console.log('Sorry, not enough milk!');
            return;
        }
        if (this.coffeeBeans < this.specialities[choice - 1].beans) {
            console.log('Sorry, not enough coffee beans!');
            return;
        }
        if (this.disposableCups < 1) {
            console.log('Sorry, not enough disposable cups!');
            return;
        }
        console.log('I have enough resources, making a coffee!\n')
        this.money += this.specialities[choice - 1].price;
        this.water -= this.specialities[choice - 1].water;
        this.milk -= this.specialities[choice - 1].milk;
        this.coffeeBeans -= this.specialities[choice - 1].beans;
        this.disposableCups--;
    }

    fillMachine() {
        this.water += Number(input('Write how many ml of water you want to add: '));
        this.milk += Number(input('Write how many ml of milk you want to add: '));
        this.coffeeBeans += Number(input('Write how many grams of coffee beans you want to add: '));
        this.disposableCups += Number(input('Write how many disposable cups you want to add: '));
    }

    returnMoney() {
        console.log(`I gave you \$${this.money}`);
        this.money = 0;
    }

    printState() {
        console.log('\nThe coffee machine has:');
        console.log(`${this.water} ml of water`);
        console.log(`${this.milk} ml of milk`);
        console.log(`${this.coffeeBeans} g of coffee beans`);
        console.log(`${this.disposableCups} disposable cups`);
        console.log(`\$${this.money} of money\n`);
    }
}

let coffeeMachine = new CoffeeMachine(550, 400, 540, 120, 9);
let action = '';
do {
    action = input('Write action (buy, fill, take, remaining, exit): ');
    switch (action) {
        case 'buy':
            coffeeMachine.makeCoffee();
            break;
        case 'fill':
            coffeeMachine.fillMachine();
            break;
        case 'take':
            coffeeMachine.returnMoney();
            break;
        case 'remaining':
            coffeeMachine.printState();
    }
} while (action !== 'exit');
