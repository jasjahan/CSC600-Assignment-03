"use strict";
/* ==========================================================================  **
## HW3 Instructions

See this Google doc for clarifications to this homework:

https://docs.google.com/document/d/1HiOEaGOq7pA5OMz4rCmp_ztxRo8GKZex3SigZVV56PY/edit?usp=sharing

** ==========================================================================  **

1. Push your solution, contained entirely in hw3.ts, back to the github classroom
   repository. Please make sure you solution compiles!!!

   To run the typescript compiler (`tsc`), make sure you have it installed
   ```
   tsc -v
   >> Version 4.4.3
   ```
   Then run the compiler
   ```
   tsc --strict --target es2019 --module commonjs hw3.ts
   ```
   to produce a file `hw3.js`. If we cannot compile your solution with `tsc`, we
   will not grade your submission. Even if you are looking for partial credit,
   your entire hw3.ts must compile, and we must be able to run the compiled js file
   in `node`.
2. Do not change any of the function interfaces.
3. Fill in everything that has TODO.

** ============================================================================ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonLinkExample2 = exports.WebEntryPathJSONValue = exports.WebEntryJSONValue = exports.jsonLinkExample = exports.ObjJSONValue = exports.ArrJSONValue = exports.StringJSONValue = exports.Tree3 = exports.Tree = exports.newStrangeNumber2 = exports.StrangeNumber2Class = exports.newStrangeNumber = exports.StrangeNumberClass = exports.RESOURCES_CONSULTED = exports.COLLABORATORS = exports.SIGNATURE = exports.HONOR_PLEDGE = void 0;
/* ==========================================================================  **
## Honor Pledge
** ============================================================================ */
exports.HONOR_PLEDGE = "I pledge on my honor that this assignment is my own work.";
exports.SIGNATURE = "MST JASMINE JAHAN"; // TODO: FILL ME IN
// If you had any collaborators on this assignment, please list their github handles here.
exports.COLLABORATORS = [
    "github handle of collaborator 1", // TODO: FILL ME IN
];
// If you used any resources, please list them here
exports.RESOURCES_CONSULTED = [
    "www.google.com", // TODO: FILL ME IN
];
/* ==========================================================================  **
## 1. In this problem, we will look at dynamic dispatch and inheritance.

Your task is to translate a class into code without classes. In doing so, we
hope you get a better sense of how dynamic dispatch and inheritance work
"underneath-the-hood".
** ============================================================================ */
/* ----------------------------------------------------- **
### 1a. Translate StrangeNumberClass into a closure.

Example:

Class behavior

    const c1 = new StrangeNumberClass()
    > [c1.isEven(2), c1.count]
    [true, 9]
    > [c1.isOdd(4), c1.count]
    [false, 48]
    > [c1.isEven(-10), c1.count]
    [true, 3228]


Your functional code should behave the same way

    const f1 = newStrangeNumber()
    > [f1.isEven(2), f1.count]
    [true, 9]
    > [f1.isOdd(4), f1.count]
    [false, 48]
    > [f1.isEven(-10), f1.count]
    [true, 3228]

** ----------------------------------------------------- */
class StrangeNumberClass {
    constructor() {
        this.count = 1;
    }
    isEven(n) {
        if (n < 0) {
            this.count = this.count * 2 + 1;
            return !this.isOdd(-n);
        }
        else if (n === 0) {
            return true;
        }
        else {
            this.count += 3;
            return this.isOdd(n - 1);
        }
    }
    isOdd(n) {
        if (n < 0) {
            this.count += 3;
            return !this.isEven(-n);
        }
        else if (n === 0) {
            return false;
        }
        else {
            this.count = this.count * 2 + 1;
            return this.isEven(n - 1);
        }
    }
}
exports.StrangeNumberClass = StrangeNumberClass;
function newStrangeNumber() {
    let count = 1;
    function _isEven(n) {
        if (n < 0) {
            this.count = this.count * 2 + 1;
            return !this.isOdd(-n);
        }
        else if (n === 0) {
            return true;
        }
        else {
            this.count += 3;
            return this.isOdd(n - 1);
        }
    }
    function _isOdd(n) {
        if (n < 0) {
            this.count += 3;
            return !this.isEven(-n);
        }
        else if (n === 0) {
            return false;
        }
        else {
            this.count = this.count * 2 + 1;
            return this.isEven(n - 1);
        }
    }
    return { count: count, isEven: _isEven, isOdd: _isOdd };
}
exports.newStrangeNumber = newStrangeNumber;
/* ----------------------------------------------------- **
### 1b. Complete the definition of newStrangeNumber2 below.

Example:

Class behavior

    const c1 = new StrangeNumber2Class()
    > [c1.isEven(2), c1.count]
    [true, 5]
    > [c1.isOdd(4), c1.count]
    [false, 6]
    > [c1.isEven(-10), c1.count]
    [true, 14]

Your functional code should behave the same way

    const f1 = newStrangeNumber2()
    > [f1.isEven(2), f1.count]
    [true, 5]
    > [f1.isOdd(4), f1.count]
    [false, 6]
    > [f1.isEven(-10), f1.count]
    [true, 14]

** ----------------------------------------------------- */
class StrangeNumber2Class extends StrangeNumberClass {
    constructor() {
        super();
    }
    isOdd(n) {
        if (n <= 0) {
            return !this.isEven(-n);
        }
        else {
            this.count += 1;
            return n % 2 === 1;
        }
    }
}
exports.StrangeNumber2Class = StrangeNumber2Class;
function newStrangeNumber2() {
    let innerFunction = newStrangeNumber();
    function _isOdd(n) {
        if (n <= 0) {
            return !this.isEven(-n);
        }
        else {
            this.count += 1;
            return n % 2 === 1;
        }
    }
    return { count: innerFunction.count, isEven: innerFunction.isEven, isOdd: _isOdd };
}
exports.newStrangeNumber2 = newStrangeNumber2;
/* ==========================================================================  **
## 2. Your favorite algebraic data type is back as a class.

Recall the Tree algebraic data type and three ways to build a Tree.
```
type Tree<T> =
    { tag: "LEAF" }
  | { tag: "NODE", contents: T, left: Tree<T>, right: Tree<T> };

function Leaf<T>(): Tree<T> {
    return { tag: "LEAF" };
}

function Node<T>(x: T, left: Tree<T>, right: Tree<T>): Tree<T> {
    return { tag: "NODE", contents: x, left: left, right: right };
}

function LeafNode<T>(x: T): Tree<T> {
    return Node(x, Leaf(), Leaf());
}
```

In this problem, we will revisit some of it using classes and objects.
** ============================================================================ */
class Tree {
    /* ----------------------------------------------------- **
    Here are some examples showing how the ADT definition maps to the
    class definition.

    Example 1:
    
    ADT:
        Leaf()

    Class:
        const tr1 = undefined

    Example 2:

    ADT:
        LeafNode(2)

    Class:
        const tr2 = new Tree(2, undefined, undefined)

            2

    Example 3:

    ADT:
        Node(3, LeafNode(2), Leaf())
        
           3
          /
         2

    Class:
        const tr3 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        undefined)

    Example 4:

    ADT:
        Node(3, LeafNode(2), Node(3, LeafNode(4), LeafNode(5)))

            3
          /  \
         2    3
            /  \
           4    5

    Class:
        const tr4 = new Tree(
                        3,
                        new Tree(2, undefined, undefined),
                        new Tree(
                            3,
                            new Tree(4, undefined, undefined),
                            new Tree(5, undefined, undefined)
                            )
                        )
    ** ----------------------------------------------------- */
    constructor(contents, left, right) {
        this.contents = contents;
        this.left = left;
        this.right = right;
    }
    /* ----------------------------------------------------- **
    ### 2a. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples:

    1. tr2.map((x) => x + 1) =

            3

    2. tr3.map((x) => x * 2) =

            6
           /
          4
    
    3. tr4.map((x) => "1" + x) =

             "13"
            /    \
         "12"    "13"
                /    \
              "14"  "15"
    ** ----------------------------------------------------- */
    map(f) {
        if (this.left !== undefined && this.right !== undefined) {
            return new Tree(f(this.contents), this.left.map(f), this.right.map(f));
        }
        else if (this.left !== undefined) {
            return new Tree(f(this.contents), this.left.map(f), undefined);
        }
        else if (this.right !== undefined) {
            return new Tree(f(this.contents), undefined, this.right.map(f));
        }
        else {
            return new Tree(f(this.contents), undefined, undefined);
        }
    }
    inserttoleftmost(midtree) {
        let newleft;
        if (this.left !== undefined) {
            newleft = this.left.inserttoleftmost(midtree);
        }
        else {
            newleft = midtree;
        }
        return new Tree(this.contents, newleft, this.right);
    }
    toTree2() {
        if (this.left !== undefined && this.right !== undefined) {
            return new Tree(this.contents, this.left.toTree2(), this.right.toTree2());
        }
        else if (this.left !== undefined) {
            return new Tree(this.contents, this.left.toTree2(), undefined);
        }
        else if (this.right !== undefined) {
            return new Tree(this.contents, undefined, this.right.toTree2());
        }
        else {
            return new Tree(this.contents, undefined, undefined);
        }
    }
}
exports.Tree = Tree;
/* ----------------------------------------------------- **
Suppose we want to create trees that have either 3 children or
2 children. One way to accomplish this is to extend the
original definition of Tree as below.
** ----------------------------------------------------- */
class Tree3 extends Tree {
    /* ----------------------------------------------------- **
    Example 1:

    const tr1 = new Tree3(2, undefined, undefined, undefined)

         2

    Example 2:
        
        const tr2 = new Tree3(
            3,
            new Tree(2, undefined, undefined),
            new Tree3(1, undefined, undefined, undefined),
            new Tree(4, undefined, undefined),
        )

            3
         /  |  \
        2   1   4

    Example 3:

        const tr3 = new Tree2(
            2,
            tr2,
            new Tree2(3, undefined, tr2)
        )

              2
            /   \
           3     3
         / | \    \
        2  1  4    \
                    3
                  / | \
                 2  1  4
    ** ----------------------------------------------------- */
    constructor(contents, left, middle, right) {
        super(contents, left, right);
        this.middle = middle;
    }
    /* ----------------------------------------------------- **
    ### 2b. Implement the map function below. Do not modify the
    "this" (current) object. You must create a new tree and return it.

    Examples:

    1. tr1.map((x) => x + 1) =

            3

    2. tr2.map((x) => x * 2) =

           6
        /  |  \
       4   2   8
    
    3. tr3.map((x) => "a" + x) =

                "a2"
              /      \
            "a3"     "a3"
          /  |  \      \
      "a2" "a1" "a4"    \
                       "a3"
                      /  |   \
                   "a2" "a1" "a4"
    ** ----------------------------------------------------- */
    map(f) {
        if (this.left !== undefined && this.right !== undefined && this.middle !== undefined) {
            return new Tree3(f(this.contents), this.left.map(f), this.middle.map(f), this.right.map(f));
        }
        else if (this.left !== undefined) {
            return new Tree3(f(this.contents), this.left.map(f), undefined, undefined);
        }
        else if (this.right !== undefined) {
            return new Tree3(f(this.contents), undefined, undefined, this.right.map(f));
        }
        else if (this.middle !== undefined) {
            return new Tree3(f(this.contents), undefined, this.middle.map(f), undefined);
        }
        else {
            return new Tree3(f(this.contents), undefined, undefined, undefined);
        }
    }
    /* ----------------------------------------------------- **
    ### 2c. Implement a function that eliminates all middle children
    and produces a tree that only has two children.
    
    Let `curr` be a node with left child `left`, middle child `mid`, and
    right child `right`. If the middle child `mid` is not `undefined`,
    then make the sub-tree rooted at the middle child `mid` the left-most
    sub-tree of the sub-tree `left.toTree2()`. That is, make `mid.toTree2()`
    the left-most sub-tree of the sub-tree `left.toTree2()`.

    Examples:

    1. tr1.toTree2() =

            3

    2. tr2.toTree2() =

           3
         /  \
        1    4
       /
      2
    
    3. tr3.toTree2() =

              2
            /   \
           3     3
         /   \    \
        1     4    \
       /            3
      2           /   \
                 1     4
                /
               2
    ** ----------------------------------------------------- */
    toTree2() {
        let newright;
        let newmid;
        let newleft;
        if (this.right !== undefined) {
            newright = this.right.toTree2();
        }
        if (this.middle !== undefined) {
            newmid = this.middle.toTree2();
        }
        if (this.left !== undefined) {
            newleft = this.left.toTree2();
        }
        if (newleft === undefined) {
            newleft = newmid;
        }
        else if (newmid !== undefined) {
            newleft = newmid.inserttoleftmost(newleft);
        }
        return new Tree(this.contents, newleft, newright);
    }
}
exports.Tree3 = Tree3;
/* ----------------------------------------------------- **
### 3a. Implement the StringJSONValue class.
** ----------------------------------------------------- */
class StringJSONValue {
    constructor(str) {
        this.str = str;
    }
    allPathsSatisfyingPredicate(predicate) {
        let acc = [];
        if (predicate(this.str)) {
            acc = acc.concat(this.str);
        }
        return acc;
    }
    fillInMissingPath() {
        let a = this.str;
        if (a === null) {
            a = "/";
        }
        return new StringJSONValue(a);
    }
}
exports.StringJSONValue = StringJSONValue;
/* ----------------------------------------------------- **
### 3b. Implement the ArrJSONValue class.
** ----------------------------------------------------- */
class ArrJSONValue {
    constructor(arr) {
        this.arr = arr;
    }
    allPathsSatisfyingPredicate(predicate) {
        let acc = [];
        for (const x of this.arr) {
            acc = acc.concat(x.allPathsSatisfyingPredicate(predicate));
        }
        return acc;
    }
    fillInMissingPath() {
        let newarr = [];
        for (const x of this.arr) {
            newarr = newarr.concat(x.fillInMissingPath());
        }
        return new ArrJSONValue(newarr);
    }
}
exports.ArrJSONValue = ArrJSONValue;
/* ----------------------------------------------------- **
### 3c. Implement the ObjJSONValue class.
** ----------------------------------------------------- */
class ObjJSONValue {
    constructor(obj) {
        this.obj = obj;
    }
    allPathsSatisfyingPredicate(predicate) {
        let acc = [];
        const jsonObj = this.obj;
        if (predicate(jsonObj.authority.str)) {
            if (jsonObj.path !== undefined) {
                acc = acc.concat(jsonObj.path.str);
            }
            else {
                acc = acc.concat("/");
            }
        }
        if (jsonObj.links !== undefined) {
            acc = acc.concat(jsonObj.links.allPathsSatisfyingPredicate(predicate));
        }
        return acc;
    }
    fillInMissingPath() {
        let jsonObj = this.obj;
        if (jsonObj.links !== undefined) {
            jsonObj.links = jsonObj.links.fillInMissingPath();
        }
        if (jsonObj.path === undefined) {
            jsonObj.path = new StringJSONValue("/");
        }
        return new ObjJSONValue(jsonObj);
    }
}
exports.ObjJSONValue = ObjJSONValue;
exports.jsonLinkExample = new ArrJSONValue([
    new ObjJSONValue({
        "authority": new StringJSONValue("one.com"),
        "path": new StringJSONValue("1"),
        "links": new ArrJSONValue([
            new ObjJSONValue({
                "authority": new StringJSONValue("www.two.com"),
                "links": new ArrJSONValue([]),
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("three.com"),
                "path": new StringJSONValue(""),
                "links": new ArrJSONValue([]),
            })
        ])
    }),
    new ObjJSONValue({
        "authority": new StringJSONValue("www.four.com"),
        "links": new ArrJSONValue([
            new ObjJSONValue({
                "authority": new StringJSONValue("seven.com"),
                "links": new ArrJSONValue([
                    new ObjJSONValue({
                        "authority": new StringJSONValue("app.one.com"),
                        "path": new StringJSONValue("2"),
                        "links": new ArrJSONValue([
                            new ObjJSONValue({
                                "authority": new StringJSONValue("eight.com"),
                                "links": new ArrJSONValue([])
                            })
                        ])
                    })
                ]),
            }),
            new ObjJSONValue({
                "authority": new StringJSONValue("app.three.com"),
                "path": new StringJSONValue("locations/42"),
                "links": new ArrJSONValue([]),
            })
        ])
    })
]);
/* ----------------------------------------------------- **
### 3d. The `ObjJSONValue` class was too general for our web-crawler.
In particular, the objects only contained two kinds of entries
given by the classes `WebEntryJSONValue` and `WebEntryPathJSONValue`
below.

Implement the two classes `WebEntryJSONValue` and `WebEntryPathJSONValue`.
** ----------------------------------------------------- */
class WebEntryJSONValue extends ObjJSONValue {
    constructor(authority, links) {
        super({
            authority: new StringJSONValue(authority),
            links: new ArrJSONValue(links.arr)
        });
    }
    allPathsSatisfyingPredicate(predicate) {
        let acc = [];
        const jsonObj = this.obj;
        if (predicate(jsonObj.authority.str)) {
            acc = acc.concat("/");
        }
        if (jsonObj.links !== undefined) {
            acc = acc.concat(jsonObj.links.allPathsSatisfyingPredicate(predicate));
        }
        return acc;
    }
    fillInMissingPath() {
        let jsonObj = this.obj;
        if (jsonObj.links !== undefined) {
            jsonObj.links = jsonObj.links.fillInMissingPath();
        }
        if (jsonObj.path === undefined) {
            jsonObj.path = new StringJSONValue("/");
        }
        return new ObjJSONValue(jsonObj);
    }
}
exports.WebEntryJSONValue = WebEntryJSONValue;
class WebEntryPathJSONValue extends ObjJSONValue {
    constructor(authority, path, links) {
        super({
            authority: new StringJSONValue(authority),
            path: new StringJSONValue(path),
            links: new ArrJSONValue(links.arr)
        });
    }
    allPathsSatisfyingPredicate(predicate) {
        let acc = [];
        const jsonObj = this.obj;
        if (predicate(jsonObj.authority.str)) {
            acc = acc.concat(jsonObj.path.str);
        }
        if (jsonObj.links !== undefined) {
            acc = acc.concat(jsonObj.links.allPathsSatisfyingPredicate(predicate));
        }
        return acc;
    }
    fillInMissingPath() {
        let jsonObj = this.obj;
        if (jsonObj.links !== undefined) {
            jsonObj.links = jsonObj.links.fillInMissingPath();
        }
        if (jsonObj.path === undefined) {
            jsonObj.path = new StringJSONValue("/");
        }
        return new ObjJSONValue(jsonObj);
    }
}
exports.WebEntryPathJSONValue = WebEntryPathJSONValue;
exports.jsonLinkExample2 = new ArrJSONValue([
    new WebEntryPathJSONValue("one.com", "1", new ArrJSONValue([
        new WebEntryJSONValue("www.two.com", new ArrJSONValue([])),
        new WebEntryPathJSONValue("three.com", "", new ArrJSONValue([]))
    ])),
    new WebEntryJSONValue("www.four.com", new ArrJSONValue([
        new WebEntryJSONValue("seven.com", new ArrJSONValue([
            new WebEntryPathJSONValue("app.one.com", "2", new ArrJSONValue([
                new WebEntryJSONValue("eight.com", new ArrJSONValue([]))
            ]))
        ])),
        new ObjJSONValue({
            "authority": new StringJSONValue("app.three.com"),
            "path": new StringJSONValue("locations/42"),
            "links": new ArrJSONValue([]),
        })
    ]))
]);
