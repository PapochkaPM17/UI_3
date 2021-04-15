import { TreeNode } from "./treenode";

export class Tree<K, T> {
    private root: TreeNode<K, T>;
    private _size: number;
    private row: HTMLElement[];
    private tree: HTMLElement[][];
    private currentHorizontalIndex: number;
    private currentVerticalIndex: number;

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
            if (currentNode === null) {
                return null;
            }
        }
        return currentNode;
    }

    add(key: K, data: T): boolean {
        let newNode = new TreeNode<K, T>(key, data);

        if (this.root === null) {
            this.root = newNode;
            this._size++;
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
                        return true;
                    }
                } else {
                    currentNode = currentNode.rightChild;
                    if (currentNode === null) {
                        parentNode.rightChild = newNode;
                        this._size++;
                        return true;
                    }
                }
            }
        }
    }

    remove(key: K): boolean {
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
        return true;
    }

    print(): void {
        let table = document.getElementById("show-tree");
        this.row = new Array(2 * this._size);
        for (let i = 0; i < 2 * this._size; i++) {
            this.row[i] = document.createElement("TR");
        }
        this.tree = new Array(this._size);
        for (let i = 0; i < 2 * this._size; i++) {
            this.tree[i] = new Array(2 * this._size);
        }
        for (let i = 0; i < 2 * this._size; i++) {
            for (let j = 0; j < 2 * this._size; j++) {
                this.tree[i][j] = document.createElement("TD");
            }
        }
        for (let i = 0; i < 2 * this._size; i++) {
            for (let j = 0; j < 2 * this._size; j++) {
                this.row[i].appendChild(this.tree[i][j]);
            }
            table.appendChild(this.row[i]);
        }
        this.currentHorizontalIndex = -1;
        this.currentVerticalIndex = this._size;
        this.printNode(this.root);
    }
    private printNode(root: TreeNode<K, T>): void {
        if (root !== null) {
            this.currentHorizontalIndex++;
            this.currentVerticalIndex--;
            this.printNode(root.leftChild);
            this.tree[this.currentHorizontalIndex][this.currentVerticalIndex].appendChild(document.createTextNode(String(root.key)));
            this.currentHorizontalIndex--;
            this.currentVerticalIndex++;
            this.currentHorizontalIndex++;
            this.currentVerticalIndex++;
            this.printNode(root.rightChild);
            this.currentHorizontalIndex--;
            this.currentVerticalIndex--;
        } else {
            return;
        }
    }
}



