<template>
  <div class="container container-map">
    <section>
      <ul class="map-list">
        <li class="map-item" v-for="(item, index) in mapList" :key="index">
          <div class="map-item-info">
            <div class="map-item-info-left">
              <p class="map-item-name">{{ item.name }}</p>
              <div class="map-info-left">
                <div class="map-info-function">
                  <div class="edit-name" @click="addMapItemPhase(index)">
                    <img :src="require('assets/img/map_phase.png')" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="item.path"
            class="map-content-box"
            ref="mapBox"
            style="position:relative"
          >
            <div class="map-content" ref="mapContent">
              <div
                :style="{
                  position: 'relative',
                  height: item.imageHeight + 'px',
                  width: item.imageWidth + 'px',
                }"
              >
                <img :src="item.path" alt="" />
                <vdr
                  v-for="(dragItem, dragIndex) in item.componentList"
                  :key="dragIndex"
                  style="position: absolute;top: 0;left: 0;"
                  :x="dragItem.x"
                  :y="dragItem.y"
                  :minWidth="130"
                  :minHeight="70"
                  :draggable="false"
                  :w="dragItem.width"
                  :h="dragItem.height"
                  :resizable="false"
                  v-on:dragging="onDrag(index, dragIndex)"
                  v-on:resizing="onResize(index, dragIndex)"
                  :parent="true"
                >
                  <div class="location_box">
                    <div class="location_mask"></div>
                    <div class="location_info">
                      <p class="location_name">
                        {{
                          clueData[dragItem.clueValue]
                            ? clueData[dragItem.clueValue].addressName
                            : ""
                        }}
                      </p>
                      <div
                        class="location_edit"
                        @click="showLocationDialog(index, dragIndex)"
                      >
                        <img
                          class="location_edit_icon"
                          :src="require('assets/img/map_edit_icon.png')"
                        />
                      </div>
                    </div>
                  </div>
                </vdr>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section class="footer">
      <div class="footer-button footer-button-nav" @click="next()">
        编辑
      </div>
    </section>
    <section>
      <el-dialog
        title=""
        :visible.sync="phaseDialogVisible"
        :show-close="false"
        :clearable="false"
        width="25%"
      >
        <p class="phase_title">流程节点</p>
        <el-select
          v-model="mapList[currentMapItemIndex].virtualProcessValue"
          multiple
          :disabled="true"
          placeholder="可多选"
        >
          <el-option
            v-for="item in processData"
            :key="item.value"
            :label="item.script_node_name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-dialog>
      <el-dialog
        title=""
        :visible.sync="locationDialogVisible"
        :show-close="false"
        width="25%"
        v-if="
          mapList[currentMapItemIndex].componentList[currentMapItemDragIdnex]
        "
      >
        <p class="phase_title">绑定地点</p>
        <el-select
          v-model="
            mapList[currentMapItemIndex].componentList[currentMapItemDragIdnex]
              .virtualClueValue
          "
          :disabled="true"
          placeholder="选择地点"
        >
          <el-option
            v-for="item in clueData"
            :key="item.value"
            :label="item.addressName"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-dialog>
    </section>
  </div>
</template>

<script>
import vdr from "vue-draggable-resizable-gorkys";
// 导入默认样式
import "vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css";

export default {
  data() {
    return {
      mapList: [
        {
          name: "地点名称1",
          editingName: "地点名称",
          path: null,
          allowEditName: false,
          componentList: [],
          virtualProcessValue: [],
          processValue: [], // 节点
        },
      ],
      loading: false,
      imageIndex: 0,
      imageUrl: null,
      index: 0,
      width: 0,
      height: 0,
      drageX: 0,
      drageY: 0,
      x: 0,
      y: 0,
      phaseDialogVisible: false,
      locationDialogVisible: false,
      value: "",
      currentMapItemDragIdnex: 0, // 标记点选择地点时使用
      currentMapItemIndex: 0, // 节点选择需要使用
      currentIndex: 0,
      currentDragIndex: 0,
      processData: {}, // 流程节点
      clueData: {}, // 线索
      basicInfoData:{},
    };
  },
  components: {
    vdr,
  },
  created() {
    let data = JSON.parse(window.localStorage.getItem("data"));
    // data.map = [ {
    //       name: "地点名称1",
    //       editingName: "地点名称",
    //       path: null,
    //       allowEditName: false,
    //       componentList: [],
    //       virtualProcessValue: [],
    //       processValue: [], // 节点
    //     },]
    //     window.localStorage.setItem('data',JSON.stringify(data))
    // return false
    if (data.map) {
      this.mapList = data.map;
    }
    this.processData = data.setArr;
    this.basicInfoData = data.basicInfoData
    this.processData.forEach((item, index) => {
      item["value"] = item.id;
    });
    this.clueData = data.clueSettingVal;
    this.clueData.forEach((item, index) => {
      item["value"] = index;
    });
    console.log(data);
  },
  methods: {
    // 控件拖动结束后
    dragstop(drageX, drageY) {
      console.log(this.$refs.drage.offsetTop, this.$refs.drage.offsetLeft);
      this.x = drageX + this.$refs.drage.offsetLeft;
      this.y = drageY + this.$refs.drage.offsetTop;
      let active = false;
      this.mapList.forEach((mapItem, mapIndex) => {
        if (mapItem.path) {
          let mapElement = this.$refs.mapBox[mapIndex];
          let mapContentElement = this.$refs.mapContent[mapIndex];
          if (
            this.y > mapElement.offsetTop &&
            this.y < mapElement.offsetTop + mapElement.offsetHeight &&
            this.x > mapElement.offsetLeft &&
            this.x < mapElement.offsetLeft + mapElement.offsetWidth
          ) {
            console.log(this.$refs.mapBox);
            active = true;
            console.log("进入");
            mapItem["componentList"].push({
              x: this.x - mapElement.offsetLeft + mapContentElement.scrollLeft,
              y: this.y - mapElement.offsetTop + mapContentElement.scrollTop,
              width: 130,
              height: 70,
              clueValue: null,
              virtualClueValue: null,
            });
          }
        }
      });
      this.drageY = 0;
      this.drageX = 0;

      console.log(drageX, drageY);
    },

    // 地图标点尺寸变化
    onResize(index, dragIndex) {
      this.currentIndex = index;
      this.currentDragIndex = dragIndex;
    },

    onResizestop(x, y, width, height) {
      console.log(x, y, width, height);
      this.mapList[this.currentIndex].componentList[
        this.currentDragIndex
      ].width = width;
      this.mapList[this.currentIndex].componentList[
        this.currentDragIndex
      ].height = height;
    },

    onDrag: function(x, y) {
      this.drageX = x;
      this.drageY = y;
    },

    // 取消节点选择
    cancelMapItemProcess() {
      this.mapList[this.currentMapItemIndex].virtualProcessValue = this.mapList[
        this.currentMapItemIndex
      ].processValue;
      this.phaseDialogVisible = false;
    },
    // 确认节点选择
    saveMapItemProcess() {
      this.mapList[this.currentMapItemIndex].processValue = this.mapList[
        this.currentMapItemIndex
      ].virtualProcessValue;
      this.phaseDialogVisible = false;
    },

    cancelMapItemCule() {
      this.mapList[this.currentMapItemIndex].componentList[
        this.currentMapItemDragIdnex
      ].virtualClueValue = this.mapList[this.currentMapItemIndex].componentList[
        this.currentMapItemDragIdnex
      ].clueValue;
      this.locationDialogVisible = false;
    },

    saveMapItemCule() {
      let value = this.mapList[this.currentMapItemIndex].componentList[
        this.currentMapItemDragIdnex
      ].virtualClueValue;

      this.mapList[this.currentMapItemIndex].componentList[
        this.currentMapItemDragIdnex
      ].clueValue = value;

      this.locationDialogVisible = false;
    },

    // 显示绑定地点弹窗
    showLocationDialog(index, dragIndex) {
      this.currentMapItemIndex = index;
      this.currentMapItemDragIdnex = dragIndex;
      this.locationDialogVisible = true;
    },

    // 删除地图标点
    removeDragOnMapItem(index, dragIndex) {
      this.mapList[index].componentList = this.mapList[
        index
      ].componentList.filter(
        (item, childrenIndex) => childrenIndex !== dragIndex
      );
    },

    // 删除地图
    removeMapItemImage(index) {
      this.mapList[index]["path"] = null;
    },

    onMapItemDrag: function(x, y) {
      this.x = x;
      this.y = y;
    },

    // 添加节点
    addMapItemPhase(index) {
      this.currentMapItemIndex = index;
      this.phaseDialogVisible = true;
    },

    // 上传图片中
    uploadMapImage() {
      this.loading = this.$loading({
        lock: true,
        text: " 上传图片中 . . .",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
    },

    // 编辑地图名称
    startEditMapName(index) {
      this.mapList[index].allowEditName = true;
    },

    // 取消编辑地图名称
    cancelEditMapName(index) {
      this.mapList[index].allowEditName = false;
    },

    // 保存地图名称
    saveEditMapName(index) {
      if (this.mapList[index].editingName === "") {
        this.$message.error("请输入地点名称！");
        return false;
      }
      this.mapList[index].name = this.mapList[index].editingName;
      this.mapList[index].allowEditName = false;
    },

    // 图片上传失败
    failedUploadMapImage() {
      this.loading.close();
      this.$message.error("上传文件失败！");
    },

    // 图片上传成功
    handleAvatarSuccess(res, file) {
      console.log(res, "res");
      this.mapList[this.imageIndex].path = res.data.result.path;
      this.mapList[this.imageIndex]["imageId"] = res.data.result.attachment_id;
      this.mapList[this.imageIndex]["imageWidth"] = res.data.result.width;
      this.mapList[this.imageIndex]["imageHeight"] = res.data.result.height;
      this.loading.close();
      this.$forceUpdate();
      // this.imageUrl = URL.createObjectURL(file.raw);
    },

    // 图片上传前验证
    beforeAvatarUpload(file) {
      console.log(file, "file");
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      // 	this.$message.error('上传图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      // 	this.$message.error('上传图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },

    // 当前选择文件的地图
    chooseImage(index) {
      this.imageIndex = index;
      console.log(index);
    },

    // 新增地图
    addMapItem() {
      this.mapList.push({
        name: `地点${this.mapList.length + 1}`,
        editingName: `地点${this.mapList.length + 1}`,
        path: null,
        virtualProcessValue: [],
        processValue: [],
        allowEditName: false,
        componentList: [],
      });
    },

    // 删除
    removeMapItem(index) {
      console.log(index);
      this.mapList = this.mapList.filter(
        (item, mapIndex) => mapIndex !== index
      );
    },
    // 上一步
    back() {
      let data = JSON.parse(window.localStorage.getItem("data"));
      data["map"] = this.mapList;
      window.localStorage.setItem("data", JSON.stringify(data));
      this.$router.go(-1);
    },
    // 下一步
    next() {
      localStorage.setItem('selRouter','mapUp')
      this.$router.push({
        path: "/updataScript/mapUp",
        query: {
          id: this.basicInfoData.id,
        },
      });
    },

    test(type) {
      console.log(type);
      // this.$router.push({
      // 	path: '/createScript/basic' 
      // })
    },
  },
};
</script>

<style>
.el-loading-text {
  text-align: center;
  font-size: 20px !important;
  margin-top: 20px !important;
}

.my-dragging-class {
  opacity: 0.9;
  /* background-color: red; */
  /* border: 1px solid black; */
}

.component-item-drage {
  z-index: 9999;
  transition: opacity all 200ms linear;
  /*  width: 130px;
		    height: 40px; */
  background: #1a95ea;
  /* opacity: 0.5; */
  color: #fff;
  border: none;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-loading-spinner i {
  font-size: 120px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang="scss">
.container-map {
  .el-select {
    margin-top: 14px;
    width: 100%;
    background: #f5f5f5;
    // border: 1px solid #EEEEEE;
    border-radius: 4px;
  }

  .el-input__inner {
    height: 50px;
    background-color: #eeeeee;
  }
}
</style>
<style lang="scss" scoped>
.container {
  padding-left: 40px;
  padding-right: 24%;
  padding-bottom: 30px;
}
.container-map {
  padding-top: 50px;
}

.location_box {
  display: flex;
  flex-flow: column;
  height: 100%;
  width: 100%;
  position: relative;
  .location_remove {
    position: absolute;
    height: 24px;
    width: 24px;
    right: -12px;
    top: -12px;
    .location_remove_icon {
      width: 100%;
      height: 100%;
    }
  }
  .location_mask {
    height: 57%;
    width: 100%;
    background: #1a95ea;
    opacity: 0.5;
  }
  .location_info {
    display: flex;
    padding: 0 12px;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    background: #fff;
    .location_name {
      color: #1a95ea;
      font-size: 14px;
    }
    .location_edit_icon {
      width: 14px;
      height: 15px;
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  margin-top: 65px;
  .footer-button {
    width: 201px;
    height: 50px;
    background: #eeeeee;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9a9a9a;
    margin-right: 25px;
  }

  .footer-button-nav {
    background: #1a96ea;
    color: #fff;
  }
}

.phase_title {
  font-size: 16px;
  color: #343434;
}

.phase-select {
  width: 100%;
}

.function {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 70px;

  .function-item {
    width: 40%;
    height: 50px;
    background: #eeeeee;
    border-radius: 5px;
    font-size: 18px;
    color: #9a9a9a;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .function-item-comfirm {
    font-size: 18px;
    background: #1a96ea;
    color: #ffffff;
  }
}
.map-content-box {
  width: 100%;
  height: 400px;
  margin-top: 24px;
  .map-content {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
}

.avatar-uploader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 99;
}

.component {
  padding: 18px 0;
  display: flex;
  align-items: center;
  z-index: 9999;
}

.component-item {
  width: 130px;
  height: 40px;
  background: #1a95ea;
  opacity: 0.5;
  z-index: 9999;
}

.component-list {
  z-index: 9999;
}

.add-map {
  width: 130px;
  height: 40px;
  background: #1a95ea;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
}

.map-item {
  .map-info-function {
    display: flex;
    align-items: center;
  }
  .edit-name-button {
    display: flex;
    align-items: center;
    .edit-name-button-item {
      width: 100px;
      height: 30px;
      border-radius: 5px;
      font-size: 16px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      justify-content: center;
      margin-right: 20px;
      &::last-child {
        margin-right: 0;
      }
    }
    .edit-name-button-cancel {
      color: #1a95ea;
      border: 1px solid #1a95ea;
    }
    .edit-name-button-save {
      color: #ffffff;
      background: #1a95ea;
    }
  }
  .mapItem_remove {
    position: absolute;
    height: 24px;
    width: 24px;
    top: -12px;
    right: -12px;
    z-index: 888;
    .mapItem_remove_icon {
      height: 100%;
      width: 100%;
    }
  }
  .map-item-name {
    font-size: 16px;
    color: #333333;
    margin-right: 23px;
  }

  padding-bottom: 27px;

  .map-item-info {
    padding: 0 19px;
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .map-item-info-left {
      display: flex;
      align-items: center;
    }
  }

  .edit-name {
    margin-right: 34px;
  }

  .map-item-remove {
    width: 18px;
    height: 18px;
  }

  .map-item-add-img {
    position: relative;
    width: 200px;
    height: 240px;
    margin-top: 24px;
  }
}
</style>
