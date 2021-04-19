import { TreeNode } from "./treenode";

export class Tree<K, T> {
    private root: TreeNode<K, T>;
    private _size: number;
    private row: HTMLElement[];
    private tree: HTMLElement[][];
    private currentHorizontalIndex: number;
    private currentVerticalIndex: number;
    private _depth: number = 0;
    private maxDepth: number = 0;

    constructor() {
        this.root = null;
        this._size = 0;
    }

    get size(): number {
        return this._size;
    }

    find(key: K): TreeNode<K, T> {
        let currentNode = this.root;
        let parentNode = this.root;
        while (currentNode.key !== key) {
            parentNode = currentNode;
            if (key < currentNode.key) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
            if (currentNode === null) {
                return null;
            }
        }
        return currentNode;
    }

    add(key: K, data: T): boolean {
        let newNode = new TreeNode<K, T>(key, data);
        this._depth = 0;
        this.maxDepth = 0;

        if (this.root === null) {
            this.root = newNode;
            this._size++;
            this.maxDepth = 1;
            return true;
        } else {
            let currentNode = this.root;
            let parentNode: TreeNode<K, T>;

            while (true) {
                parentNode = currentNode;
                if (key === currentNode.key) {
                    return false;
                } else if (key < currentNode.key) {
                    currentNode = currentNode.leftChild;
                    if (currentNode === null) {
                        parentNode.leftChild = newNode;
                        this._size++;
                        this.depth(this.root);
                        return true;
                    }
                } else {
                    currentNode = currentNode.rightChild;
                    if (currentNode === null) {
                        parentNode.rightChild = newNode;
                        this._size++;
                        this.depth(this.root);
                        return true;
                    }
                }
            }
        }
    }

    remove(key: K): boolean {
        this._depth = 0;
        this.maxDepth = 0;
        let currentNode = this.root;
        let parentNode = this.root;
        let isLeft: boolean = true;
        while (currentNode.key !== key) {
            parentNode = currentNode;
            if (key < currentNode.key) {
                isLeft = true;
                currentNode = currentNode.leftChild;
            } else {
                isLeft = false;
                currentNode = currentNode.rightChild;
            }
            if (currentNode == null) {
                return false;
            }
        }
        if (currentNode.leftChild === null && currentNode.rightChild === null) {
            if (currentNode === this.root) {
                this.root = null;
            } else if (isLeft) {
                parentNode.leftChild = null;
            } else {
                parentNode.rightChild = null;
            }
        } else if (currentNode.rightChild === null) {
            if (currentNode === this.root) {
                this.root = currentNode.leftChild;
            } else if (isLeft) {
                parentNode.leftChild = currentNode.leftChild;
            } else {
                parentNode.rightChild = currentNode.leftChild;
            }
        } else if (currentNode.leftChild === null) {
            if (currentNode === this.root) {
                this.root = currentNode.rightChild;
            } else if (isLeft) {
                parentNode.leftChild = currentNode.rightChild;
            } else {
                parentNode.rightChild = currentNode.rightChild;
            }
        } else {
            let parent = currentNode;
            let inher = currentNode;
            let current = currentNode.rightChild;
            while (current !== null) {
                parent = inher;
                inher = current;
                current = current.leftChild;
            }
            if (inher !== currentNode.rightChild) {
                parent.leftChild = inher.rightChild;
                inher.rightChild = currentNode.rightChild;
            }

            if (currentNode === this.root) {
                this.root = inher;
            } else if (isLeft) {
                parentNode.leftChild = inher;
            } else {
                parentNode.rightChild = inher;
            }
        }
        this._size--;
        this.depth(this.root);
        return true;
    }

    print(): void {
        let table = document.getElementById("show-tree");
        this.clear(table);
        this.row = new Array(this.maxDepth);
        for (let i = 0; i < this.maxDepth; i++) {
            this.row[i] = document.createElement("TR");
        }
        this.tree = new Array(this.maxDepth);
        for (let i = 0; i < this.maxDepth; i++) {
            this.tree[i] = new Array(2 * this.maxDepth * (this.maxDepth + 1) / 2);
        }
        for (let i = 0; i < this.maxDepth; i++) {
            for (let j = 0; j < 2 * this.maxDepth * (this.maxDepth + 1) / 2; j++) {
                this.tree[i][j] = document.createElement("TD");
            }
        }
        for (let i = 0; i < this.maxDepth; i++) {
            for (let j = 0; j < 2 * this.maxDepth * (this.maxDepth + 1) / 2; j++) {
                this.row[i].appendChild(this.tree[i][j]);
            }
            table.appendChild(this.row[i]);
        }
        this.currentHorizontalIndex = -1;
        this.currentVerticalIndex = this.maxDepth * (this.maxDepth + 1) / 2;
        this.printNode(this.root, true);
    }

    private printNode(root: TreeNode<K, T>, isLeft: boolean): void {
        if (root !== null) {
            this.currentHorizontalIndex++;
            if (isLeft) {
                for (let i = this.maxDepth - this.level(root); i > 0; i--) {
                    this.currentVerticalIndex--;
                }
            } else {
                for (let i = this.maxDepth - this.level(root) + 1; i > 0; i--) {
                    this.currentVerticalIndex++;
                }
            }
            this.printNode(root.leftChild, true);
            this.printNode(root.rightChild, false);
            this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].appendChild(document.createTextNode(String(root.key)));
            if (isLeft) {
                this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].className = "left";
                if (root === this.root) {
                    this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].className = "root";
                }
                for (let i = this.maxDepth - this.level(root) + 1; i > 0; i--) {
                    this.currentVerticalIndex++;
                }
            } else {
                this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].className = "right";
                if (root === this.root) {
                    this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].className = "root";
                }
                for (let i = this.maxDepth - this.level(root) + 1; i > 0; i--) {
                    this.currentVerticalIndex--;
                }
            }
            this.currentHorizontalIndex--;
        } else {
            return;
        }
    }

    private clear(table: HTMLElement): void {
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
    }

    private depth(root: TreeNode<K, T>): void {
        if (root !== null) {
            this._depth++;
            this.depth(root.leftChild);
            if (this._depth > this.maxDepth) {
                this.maxDepth = this._depth;
            }
            this.depth(root.rightChild);
            if (this._depth > this.maxDepth) {
                this.maxDepth = this._depth;
            }
            this._depth--;
        }
    }

    private level(root: TreeNode<K, T>): number {
        let level: number = 1;
        let currentNode: TreeNode<K, T> = this.root;
        let parentNode: TreeNode<K, T> = this.root;
        while (currentNode.key !== root.key) {
            parentNode = currentNode;
            if (root.key < currentNode.key) {
                currentNode = currentNode.leftChild;
            } else {
                currentNode = currentNode.rightChild;
            }
            level++;
        }
        return level;
    }
}



