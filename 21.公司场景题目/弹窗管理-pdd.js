// 实现一个弹窗管理工具，每个弹窗都有唯一的popupId，如果加入的弹窗popupId存在，则更新zIndex
// 弹窗按照zIdex大小进行排序，同等大小的，则先加入的在先
// 获取时返回popupId的数组
class PopupManager {
  #popupList;
  constructor() {
    this.#popupList = [];
  }
  add(popupId, zIndex) {
    let toFindIdx = this.#popupList.findIndex(
      (popup) => popup.popupId === popupId
    );
    if (toFindIdx > -1) {
      this.#popupList.splice(toFindIdx, 1);
    }
    let toInsertIdx = this.#popupList.findIndex(
      (popup) => popup.zIndex > zIndex
    );
    if (toInsertIdx > -1) {
      this.#popupList.splice(toInsertIdx, 0, { popupId, zIndex });
    } else {
      this.#popupList.push({ popupId, zIndex });
    }
  }
  remove(popupId) {
    this.#popupList = this.#popupList.filter(
      (popup) => popup.popupId !== popupId
    );
  }
  clear() {
    this.#popupList = [];
  }
  getPopupList() {
    return this.#popupList.map((popup) => popup.popupId);
  }
}

const manager = new PopupManager();
manager.add("pid-1", 2);
manager.add("pid-2", 5);
manager.add("pid-3", 8);
manager.add("pid-4", 0);
console.log("add: ", manager.getPopupList());
manager.add("pid-1", 6);
console.log("update: ", manager.getPopupList());
manager.remove("pid-1");
console.log("remove: ", manager.getPopupList());
manager.clear("pid-1");
console.log("clear: ", manager.getPopupList());
