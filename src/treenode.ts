export class TreeNode<K, T> {
    private readonly _key: K;
    private _data: T;
    private _leftChild: TreeNode<K, T>;
    private _rightChild: TreeNode<K, T>;

    constructor(key: K, data: T) {
        this._key = key;
        this._data = data;
        this._leftChild = null;
        this._rightChild = null;
    }

    get key(): K {
        return this._key;
    }

    get data(): T {
        return this._data;
    }

    set data(data: T) {
        this._data = data;
    }

    get leftChild(): TreeNode<K, T> {
        return this._leftChild;
    }

    set leftChild(leftChild: TreeNode<K, T>) {
        this._leftChild = leftChild;
    }

    get rightChild(): TreeNode<K, T> {
        return this._rightChild;
    }

    set rightChild(rightChild: TreeNode<K, T>) {
        this._rightChild = rightChild;
    }
}
