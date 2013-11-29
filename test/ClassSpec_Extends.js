describe("Class Extends", function() {

  var Person,
      Employee,
      person,
      employee,
      options = {age: 29};

  // TODO i don't think the beforeEach is needed; I just see it as more safe for future adds
  beforeEach(function() {

    Person = new Class({
      work: "unemployeed",
      demoObj: { any: "any" },
      getAge: function() { 
        return this.age;
      },
      initialize: function(options) {
        this.age = (options && options.age) || -1;
      }
    });

    Employee = new Class({
      Extends: Person,
      work: "employee",
      demoObj: { anymore: "anymore" },
      demoArray: [{ a: "a" }, "b", "c"],
      initialize: function(options) {
        this.parent(options);
      }    
    });

    employee = new Employee( options );
  });

  //describe("Extends feature", function() {

    describe("Employee inherits from Person", function() {
      it("should get the contructor property equals to Person (when instantiaced)", function () { 
        expect(employee.constructor === Person).toBeTruthy();
      });

      it("should be instantiated as instanceof Employee", function() {
        expect(employee instanceof Employee).toBeTruthy();
      });

      it("should also be instantiated as instanceof Person", function() {
        expect(employee instanceof Person).toBeTruthy();
      });

      it("should inherits the getAge method from Person", function() {
        expect( typeof Employee.prototype.getAge === "function" ).toBeTruthy();
      });
    });

    describe("this.parent: call the super method from the sub's (when the super method is overridden by the sub's)", function() {
      it("should make employee getting age equals 29 (see the constructor)", function() {
        expect(employee.age === 29).toBeTruthy();
      });
    });

    describe("properties as objects, with the same name on sub and parent, are merged: checking the common property demoObj", function() {
      it("should have got two value ('any' and 'anymore') on employee", function() {
        expect( Employee.prototype.demoObj.any && Employee.prototype.demoObj.anymore ).toBeTruthy();
      });
    });

    describe("properties as objects and arrays are cloned, they are not got from the prototypal chain. Checking the  property demoArray", function() {
      it("Changing a value of it on employee, it shouldn't change on Employee", function() {
        var originalVal = Employee.prototype.demoArray[0];
        employee.demoArray[0] = "i am changed";
        expect(Employee.prototype.demoArray[0]).toBe(originalVal);

        originalVal = Employee.prototype.demoArray[0].a;
        employee.demoArray[0].a = "i am changed again";
        expect(Employee.prototype.demoArray[0].a).toBe(originalVal);

        originalVal = Employee.prototype.demoArray[1];
        employee.demoArray[1] = "i am changed too";
        expect(Employee.prototype.demoArray[1]).toBe("b");

        originalVal = Employee.prototype.demoArray[2];
        employee.demoArray[2] = "and so did I";
        expect(Employee.prototype.demoArray[2]).toBe("c");
      });
    });

    describe("methods defined on both the sub and the super are cloned (by wrappers)", function() {
      it("should be different the 'initiliaze' method on Employee and Person", function() {
        expect(Person.prototype.initialize === Employee.prototype.initialize).toBeFalsy();
      });
    });

    describe("methods defined only on sub or super are are reached by prototypal chain", function() {
      it("should be the same 'getAge' method on Employee and Person", function() {
        expect(Person.prototype.getAge === Employee.prototype.getAge).toBeTruthy();
      });
    });

  //});

});
