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

    newNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (newKey.value !== "" && newData.value !== "") {
            if (tree.add(Number(newKey.value), newData.value)) {
                tree.print();
                document.getElementById("finded-node").children[0].children[0].innerHTML = "Элемент добавлен";
            } else {
                document.getElementById("finded-node").children[0].children[0].innerHTML = "Элемент с таким ключом уже присутствует";
            }
        }
    });

    removeNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (removeNodeKey.value !== "") {
            if (tree.remove(Number(removeNodeKey.value))) {
                tree.print();
                document.getElementById("finded-node").children[0].children[0].innerHTML = "Элемент удален";
            } else {
                document.getElementById("finded-node").children[0].children[0].innerHTML = "Элемента с таким ключом не найдено";
            }
        }
    });

    findNode.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        if (findNodeKey.value !== "") {
            let findedNode = tree.find(Number(findNodeKey.value));
            if (findedNode !== null) {
                document.getElementById("finded-node").children[0].children[0].innerHTML = findedNode.data;
            } else {
                document.getElementById("finded-node").children[0].children[0].innerHTML = "Элемента с таким ключом не найдено";
            }
        }
    });
}





