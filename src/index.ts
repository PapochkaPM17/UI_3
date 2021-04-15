import { Tree } from "./tree";

if (typeof document !== "undefined") {
    let tree = new Tree<number, string>();
    let newNode = document.querySelector("#new-node-form") as HTMLFormElement;
    let newKey = document.querySelector("#new-node-key") as HTMLInputElement;
    let newData = document.querySelector("#new-node-data") as HTMLInputElement;
    let removeNode = document.querySelector("#remove-node-form") as HTMLFormElement;
    let removeNodeKey = document.querySelector("#remove-node-key") as HTMLInputElement;
    let findNode = document.querySelector("#find-node-form") as HTMLFormElement;
    let findNodeKey = document.querySelector("#find-node-key") as HTMLInputElement;
    let showTree = document.querySelector("#show-tree-form") as HTMLFormElement;

    newNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (newKey.value !== "" && newData.value !== "") {
            if (tree.add(Number(newKey.value), newData.value)) {
                alert("Добавлено!");
            }
        }
    });

    removeNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (removeNodeKey.value !== "") {
            if (tree.remove(Number(removeNodeKey.value))) {
                alert("Удалено!");
            }
        }
    });

    findNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (findNodeKey.value !== "") {
            let findedNode = tree.find(Number(findNodeKey.value));
            if (findedNode !== null) {
                alert("key = " + findedNode.key + "\ndata = " + findedNode.data);
            }
        }
    });

    showTree.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        tree.print();
    });
}





