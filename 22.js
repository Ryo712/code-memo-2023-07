// 人間クラス
class Human {
    constructor(name, age, gender) {
      this.name = name;
      this.age = age;           
      this.gender = gender;
    }
    //属性。class Humanを構成する要素
  
    introduce() {
      return `Hi, I'm ${this.name}, ${this.age} years old, ${this.gender}.`;
    }
  }
  
  // インスタンスの生成と使用例
  const person1 = new Human("Alice", 30, "female");
  console.log(person1.introduce()); // 出力: Hi, I'm Alice, 30 years old, female.
  
  const person2 = new Human("Bob", 25, "male");
  console.log(person2.introduce()); // 出力: Hi, I'm Bob, 25 years old, male.