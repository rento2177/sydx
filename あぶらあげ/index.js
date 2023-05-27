let id = localStorage.getItem("ID");
let ps;
if (id == null) {
    id = Math.random().toString(36).slice(-9);
    localStorage.setItem("ID", id)
}
console.log(id);

if (ps != null) {
    id = id + ", kkk";
}
