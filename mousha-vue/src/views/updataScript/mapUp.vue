<template>
    <div
        class="container container-map"
        :style="{ paddingTop: showComponent ? 76 + 'px' : 0 }"
    >
        <div v-if="showComponent" class="component component-fixed">
            <p class="component-text">
                热点控件：
            </p>
            <ul class="component-list">
                <li class="component-item" ref="drag">
                    <vdr
                        class="component-item-drage"
                        @dragstop="dragstop"
                        :enable-native-drag="true"
                        class-name-dragging="my-dragging-class"
                        :w="100"
                        :h="40"
                        :x="dragX"
                        :y="dragY"
                        v-on:dragging="onDrag"
                        :resizable="false"
                        :parent="false"
                    >
                    </vdr>
                </li>
            </ul>
        </div>
        <div v-else class="component">
            <p class="component-text">
                热点控件：
            </p>
            <ul class="component-list">
                <li class="component-item" ref="drag">
                    <vdr
                        class="component-item-drage"
                        @dragstop="dragstop"
                        :enable-native-drag="true"
                        class-name-dragging="my-dragging-class"
                        :w="100"
                        :h="40"
                        :x="dragX"
                        :y="dragY"
                        v-on:dragging="onDrag"
                        :resizable="false"
                        :parent="false"
                    >
                    </vdr>
                </li>
            </ul>
        </div>
        <section>
            <ul class="map-list">
                <li
                    class="map-item"
                    v-for="(item, index) in mapList"
                    :key="index"
                >
                    <div class="map-item-info">
                        <div class="map-item-info-left">
                            <input
                                v-if="item.allowEditName"
                                :disabled="!item.allowEditName"
                                v-model="item.editingName"
                                class="map-item-name"
                            />
                            <p v-else class="map-item-name">{{ item.name }}</p>
                            <div
                                v-if="item.allowEditName"
                                class="edit-name-button"
                            >
                                <div
                                    class="edit-name-button-item edit-name-button-cancel"
                                    @click="cancelEditMapName(index)"
                                >
                                    取消
                                </div>
                                <div
                                    class="edit-name-button-item edit-name-button-save"
                                    @click="saveEditMapName(index)"
                                >
                                    保存
                                </div>
                            </div>
                            <div v-else class="map-info-left">
                                <div class="map-info-function">
                                    <div
                                        @click="startEditMapName(index)"
                                        class="edit-name"
                                    >
                                        <img
                                            :src="
                                                require('assets/img/map_edit_name.png')
                                            "
                                            alt=""
                                        />
                                    </div>
                                    <div
                                        class="edit-name"
                                        @click="addMapItemPhase(index)"
                                    >
                                        <img
                                            :src="
                                                require('assets/img/map_phase.png')
                                            "
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="index !== 0"
                            @click="removeMapItem(index)"
                            class="map-item-remove"
                        >
                            <img
                                style="width: 100%;height: 100%;"
                                :src="require('assets/img/map_item_remove.png')"
                                alt=""
                            />
                        </div>
                    </div>
                    <div
                        v-if="item.path"
                        class="map-content-box"
                        ref="mapBox"
                        style="position:relative"
                    >
                        <div
                            class="mapItem_remove"
                            @click="removeMapItemImage(index)"
                        >
                            <img
                                class="mapItem_remove_icon"
                                :src="require('assets/img/map_remove.png')"
                                alt=""
                            />
                        </div>
                        <div class="map-content" ref="mapContent">
                            <div
                                :style="{
                                    position: 'relative',
                                    height: item.imageHeight + 'px',
                                    width: item.imageWidth + 'px'
                                }"
                            >
                                <img :src="item.path" alt="" />
                                <vdr
                                    v-for="(dragItem,
                                    dragIndex) in item.componentList"
                                    :key="dragIndex"
                                    style="position: absolute;top: 0;left: 0;"
                                    :x="dragItem.x"
                                    :y="dragItem.y"
                                    :minWidth="100"
                                    :minHeight="70"
                                    :w="dragItem.width"
                                    :h="dragItem.height"
									@dragstop="onDragstop"
                                    @activated="getIndex(index, dragIndex)"
                                    @deactivated="onDeactivated(index, dragIndex)"
                                    v-on:dragging="onDragStart(index, dragIndex)"
									v-on:resizestop="onResizestop"
                                    v-on:resizing="onResize(index, dragIndex)"
                                    :parent="true"
                                >
                                    <div class="location_box">
                                        <div class="location_mask"></div>
                                        <div
                                            class="location_remove"
                                            @click="
                                                removeDragOnMapItem(
                                                    index,
                                                    dragIndex
                                                )
                                            "
                                        >
                                            <img
                                                class="location_remove_icon"
                                                :src="
                                                    require('assets/img/map_remove.png')
                                                "
                                                alt=""
                                            />
                                        </div>
                                        <div class="location_info">
                                            <p class="location_name">
                                                {{
                                                    clueData[dragItem.clueValue]
                                                        ? clueData[
                                                              dragItem.clueValue
                                                          ].addressName
                                                        : ""
                                                }}
                                            </p>
                                            <div
                                                class="location_edit"
                                                @click="
                                                    showLocationDialog(
                                                        index,
                                                        dragIndex
                                                    )
                                                "
                                            >
                                                <img
                                                    class="location_edit_icon"
                                                    :src="
                                                        require('assets/img/map_edit_icon.png')
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </vdr>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else
                        class="map-item-add-img"
                        @click="chooseImage(index)"
                    >
                        <img
                            style="width: 100%;height: 100%;"
                            :src="require('assets/img/map_add.png')"
                            alt=""
                        />
                        <el-upload
                            class="avatar-uploader"
                            :limit="1"
                            :action="urlPath"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :on-error="failedUploadMapImage"
                            :on-progress="uploadMapImage"
                            :before-upload="beforeAvatarUpload"
                        >
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </li>
            </ul>
            <button class="add-map" @click="addMapItem()">新增</button>
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
                    :disabled="currentMapItemIndex !== 0 ? false : true"
                    placeholder="可多选"
                >
                    <el-option
                        v-for="item in processData"
                        :key="item.id"
                        :label="item.script_node_name"
                        :value="item.id"
                    >
                    </el-option>
                </el-select>
                <div class="function">
                    <div class="function-item" @click="cancelMapItemProcess()">
                        取消
                    </div>
                    <div
                        class="function-item function-item-comfirm"
                        @click="saveMapItemProcess()"
                    >
                        保存
                    </div>
                </div>
            </el-dialog>
            <el-dialog
                title=""
                :visible.sync="locationDialogVisible"
                :show-close="false"
                width="25%"
                v-if="
                    mapList[currentMapItemIndex].componentList[
                        currentMapItemDragIdnex
                    ]
                "
            >
                <p class="phase_title">绑定地点</p>
                <el-select
                    v-model="
                        mapList[currentMapItemIndex].componentList[
                            currentMapItemDragIdnex
                        ].virtualClueValue
                    "
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
                <div class="function">
                    <div class="function-item" @click="cancelMapItemCule()">
                        取消
                    </div>
                    <div
                        class="function-item function-item-comfirm"
                        @click="saveMapItemCule()"
                    >
                        保存
                    </div>
                </div>
            </el-dialog>
        </section>
        <section class="footer">
            <div class="footer-button footer-button-nav" @click="next()">
                保存
            </div>
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
            id: 0,
            showComponent: false,
            mapList: [
                {
                    name: "地点名称1",
                    editingName: "地点名称",
                    path: null,
                    allowEditName: false,
                    componentList: [],
                    virtualProcessValue: [],
                    processValue: [] // 节点
                }
            ],
            scrollTop: 0,
            loading: false,
            imageIndex: 0,
            imageUrl: null,
            index: 0,
            width: 0,
            height: 0,
            dragX: 0,
            dragY: 0,
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
            urlPath:''
        };
    },
    components: {
        vdr
    },
    created() {
        this.urlPath = this.$urlHttp + '/current/upload/index';
        let data = JSON.parse(window.localStorage.getItem("data"));
        this.id = this.$route.query.id;
        this.getScriptDetail();
        window.addEventListener("scroll", this.watchScroll);
    },
    methods: {
        // 监听滚动条
        watchScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 70) {
                this.showComponent = true;
            } else {
                this.showComponent = false;
            }
            this.scrollTop = scrollTop;
            // console.log(scrollTop);
        },

        // 获取剧本详情
        getScriptDetail() {
            let data = {
                url: "/current/script/details",
                method: "post",
                data: {
                    script_id: this.id
                }
            };
            this.$apiAxiox(data).then(res => {
                // 流程节点
                let arr = [];
                res.data.script_node_list.some(item => {
                    let obj = {
                        script_node_name: item.name, //节点名称
                        order_num: item.order_num, //节点序号
                        node_type: item.node_type, //节点类型【1故事背景2自我介绍3剧本阅读4搜证5答题6结算】
                        describe: item.describe, //节点说明
                        button_name: item.button_name, //按钮名称
                        min_experience: item.min_experience, //保底经验值
                        experience: item.experience, //经验值/得分
                        id: item.script_node_id,
                        status: true
                    };
                    arr.push(obj);
                });
                this.processData = arr;
                this.processData.forEach((item, index) => {
                    item["value"] = item.id;
                });

                // 线索设置
                let arr3 = [];
                let arr4 = [];

                res.data.script_place_list.some(item => {
                    let arr5 = [];
                    if (item.clue_list.length > 0) {
                        item.clue_list.some(itemChild => {
                            let obj1 = {};
                            if (itemChild.is_going == 1) {
                                obj1 = {
                                    id: itemChild.script_clue_id,
                                    clueNode: itemChild.script_node_name, //线索的节点数据的键
                                    clueName: itemChild.name, //线索名称
                                    clueMain: itemChild.detail, //线索详情
                                    pathId: itemChild.attachment_id, //线索图片ID
                                    cluePath: itemChild.attachment, //线索图片ID
                                    clueSel: itemChild.is_open, //是否强制公开【1是0否】
                                    forceSel: itemChild.is_going, //是否可深入【1是0否】
                                    clueNameChild: itemChild.child.name, //深入线索的子线索名称
                                    pathsId: itemChild.child.attachment_id, //深入线索的子线索图片ID
                                    cluePaths: itemChild.child.attachment, //深入线索的子线索图片ID
                                    clueSels: itemChild.child.is_open, //深入线索的子线索-是否强制公开【1是0否】
                                    clueMainChild: itemChild.child.detail, //深入线索的子线索详情
                                    childId: itemChild.child.script_clue_id
                                };
                            } else {
                                obj1 = {
                                    id: itemChild.script_clue_id,
                                    clueNode: itemChild.script_node_name, //线索的节点数据的键
                                    clueName: itemChild.name, //线索名称
                                    clueMain: itemChild.detail, //线索详情
                                    pathId: itemChild.attachment_id, //线索图片ID
                                    cluePath: itemChild.attachment, //线索图片ID
                                    clueSel: itemChild.is_open, //是否强制公开【1是0否】
                                    forceSel: itemChild.is_going //是否可深入【1是0否】
                                };
                            }
                            arr4.push(obj1);
                        });
                    }

                    if (item.no_script_role_list.length > 0) {
                        item.no_script_role_list.some(itemShow => {
                            arr5.push(itemShow.script_role_name);
                        });
                    }
                    let obj = {
                        addressName: item.name, //地点名称
                        id: item.script_place_id, //地点id
                        showRole: arr5, //选择的不可见角色数据的键|[0,1]
                        clueVal: arr4,
                        status: true
                    };
                    arr3.push(obj);
                });

                this.clueData = arr3;
                this.clueData.forEach((item, index) => {
                    item["value"] = index;
                });

                // 地图设置
                let arr6 = [];
                res.data.script_node_map_list.forEach((item, index) => {
                    let processValue = [];
                    let componentList = [];
                    // 节点
                    item.script_node_list.forEach(nodeItem => {
                        processValue.push(nodeItem.script_node_id);
                    });

                    // 控件
                    item.script_map_place_list.forEach(mapItem => {
                        // componentList.push(mapItem)
                        componentList.push({
                            x: mapItem.control_x_coordinate,
                            y: mapItem.control_y_coordinate,
                            width: mapItem.control_width,
                            height: mapItem.control_height,
                            clueValue: mapItem.script_place_key,
                            virtualClueValue: mapItem.script_place_key,
                            script_map_place_id: mapItem.script_map_place_id
                            // script_place_id:mapItem.script_place_id
                        });
                    });

                    arr6.push({
                        script_node_map_id: item.script_node_map_id,
                        name: item.name,
                        editingName: item.name,
                        allowEditName: false,
                        componentList: componentList,
                        virtualProcessValue: processValue,
                        processValue: processValue, // 节点
                        path: item.attachment,
                        imageId: item.attachment_id,
                        imageWidth: item.attachment_width,
                        imageHeight: item.attachment_height
                    });
                });
                this.mapList = arr6;
            });
        },

        // 控件拖动结束后
        dragstop(x, y) {
            // console.log(this.$refs.drag)
            // console.log(this.$refs.drag.offsetTop, this.$refs.drag.offsetLeft);
            this.x = x + this.$refs.drag.offsetLeft;
            this.y = y + this.$refs.drag.offsetTop;

            let active = true;
            this.mapList.forEach((mapItem, mapIndex) => {
                // console.log('x',this.x)
                // console.log('y',this.y)
                // console.log('scrollTop',this.scrollTop)
                // console.log('offsetTop',this.$refs.mapBox[mapIndex].offsetTop)
                // console.log('offsetHeight',this.$refs.mapBox[mapIndex].offsetHeight)
                if (mapItem.path) {
                    let mapElement = this.$refs.mapBox[mapIndex];
                    let mapContentElement = this.$refs.mapContent[mapIndex];
                    if (this.scrollTop > mapElement.offsetTop) {
                        // this.y > this.scrollTop - mapElement.offsetTop &&
                        //     this.y <
                        //         this.scrollTop -
                        //             mapElement.offsetTop +
                        //             mapElement.offsetHeight
                        if (
                            mapElement.offsetTop + mapElement.offsetHeight > this.y + this.scrollTop &&
                            this.y + this.scrollTop > mapElement.offsetTop &&
                            this.x > mapElement.offsetLeft &&
                            this.x <
                                mapElement.offsetLeft + mapElement.offsetWidth
                        ) {
                            mapItem["componentList"].push({
                                x:
                                    this.x -
                                    mapElement.offsetLeft +
                                    mapContentElement.scrollLeft,
                                y:
                                    this.y -
                                    (this.scrollTop - mapElement.offsetTop) +
                                    mapContentElement.scrollTop,
                                width: 100,
                                height: 70,
                                clueValue: null,
                                virtualClueValue: null
                            });
                        }
                    } else {
                        // this.y > mapElement.offsetTop - this.scrollTop &&
                        //     this.y <
                        //         mapElement.offsetTop -
                        //             this.scrollTop +
                        //             mapElement.offsetHeight
                        if (
                            mapElement.offsetTop + mapElement.offsetHeight > this.y + this.scrollTop &&
                            this.y + this.scrollTop > mapElement.offsetTop &&
                            this.x > mapElement.offsetLeft &&
                            this.x <
                                mapElement.offsetLeft + mapElement.offsetWidth
                        ) {
                            mapItem["componentList"].push({
                                x:
                                    this.x -
                                    mapElement.offsetLeft +
                                    mapContentElement.scrollLeft,
                                y:
                                    this.y -
                                    (mapElement.offsetTop - this.scrollTop) +
                                    mapContentElement.scrollTop,
                                width: 100,
                                height: 70,
                                clueValue: null,
                                virtualClueValue: null
                            });
                        }
                    }
                }
            });
            this.dragY = 0;
            this.dragX = 0;
            // console.log(x, y);
        },

        // 地图标点大小
        onResize(index, dragIndex) {
            console.log(index);
            console.log(dragIndex);
            this.currentIndex = index;
            this.currentDragIndex = dragIndex;
        },
		
		// 拖动结束
		onDragstop(x,y){
			this.mapList[this.currentIndex].componentList[
			    this.currentDragIndex
			].x = x;
			this.mapList[this.currentIndex].componentList[
			    this.currentDragIndex
            ].y = y;
            // console.log(this.mapList)
		},
		
		// 拖动开始
		onDragStart(index,dragIndex){
			this.currentIndex = index;
			this.currentDragIndex = dragIndex;
		},
		onDeactivated(i,i1){
            // console.log(i)
            // console.log(i1)
            // debugger
            // this.currentIndex = '';
            // this.currentDragIndex = '';
        },
        getIndex(i,i1){
            this.currentIndex = i;
			this.currentDragIndex = i1;
        },
		// 调整大小结束
        onResizestop(x, y, width, height) {
            // console.log(x, y, width, height);
            this.mapList[this.currentIndex].componentList[
                this.currentDragIndex
            ].width = width;
            this.mapList[this.currentIndex].componentList[
                this.currentDragIndex
            ].height = height;
        },

        onDrag: function(x, y) {
            this.dragX = x;
            this.dragY = y;
        },

        // 取消节点选择
        cancelMapItemProcess() {
            this.mapList[
                this.currentMapItemIndex
            ].virtualProcessValue = this.mapList[
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
            ].virtualClueValue = this.mapList[
                this.currentMapItemIndex
            ].componentList[this.currentMapItemDragIdnex].clueValue;
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
                background: "rgba(0, 0, 0, 0.7)"
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
            this.mapList[this.imageIndex]["imageId"] =
                res.data.result.attachment_id;
            this.mapList[this.imageIndex]["imageWidth"] = res.data.result.width;
            this.mapList[this.imageIndex]["imageHeight"] =
                res.data.result.height;
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
                componentList: []
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
            console.log(this.mapList);
            console.log(this.clueData);
            // debugger
            let pass = true;
            this.mapList.forEach((item, index) => {
              if (item.processValue.length < 1) {
                console.log(item.processValue);
                pass = false;
              }
              if (!item.path) {
                console.log(2);
                pass = false;
              }
            //   item.componentList.forEach((locationItem) => {
            //     if (locationItem.clueValue === null) {
            //       console.log(1);
            //       pass = false;
            //     }
            //   });
            });

            if (!pass) {
              this.$message.error("数据未填写完整，请检查！");
              return false;
            }

            let script_node_map_data = [];

            this.mapList.forEach((item, index) => {
              script_node_map_data[index] = {
                script_node_map_id: item.script_node_map_id,
                script_node_ids: item.processValue,
                script_node_map_name: item.name,
                attachment: item.imageId,
                script_map_place_data: [],
              };
              item.componentList.forEach((locationItem) => {
                  console.log(this.clueData)
                script_node_map_data[index].script_map_place_data.push({
                  script_map_place_id: locationItem.script_map_place_id,
                  script_place_id: this.clueData[locationItem.clueValue].id,
                  control_x_coordinate: locationItem.x,
                  control_y_coordinate: locationItem.y,
                  control_width: locationItem.width,
                  control_height: locationItem.height,
                });
              });
            });

            let dataObj = {
              script_id: this.id,
              script_node_map_data: script_node_map_data,
            };
            let data = {
              url: "/current/script/edit",
              method: "post",
              data: {
                add_script_data: JSON.stringify(dataObj),
              },
            };
            let that = this;
            this.$apiAxiox(data).then((res) => {
              if (res.data.code == 1) {
                that.$message.success(res.data.msg);
              } else {
                that.$message.error(res.data.msg);
              }
            });
        },

        test(type) {
            console.log(type);
            // this.$router.push({
            // 	path: '/createScript/basic'
            // })
        }
    }
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
.component-fixed {
    position: fixed;
    z-index: 888;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 40px !important;
    background: #fff;
}
.container {
    padding-left: 40px;
    padding-right: 24%;
    padding-bottom: 30px;
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
    z-index: 10;
}

.component-item {
    width: 100px;
    height: 40px;
    background: #1a95ea;
    opacity: 0.5;
    z-index: 9999;
}

.component-list {
    z-index: 9999;
}

.add-map {
    width: 100px;
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
