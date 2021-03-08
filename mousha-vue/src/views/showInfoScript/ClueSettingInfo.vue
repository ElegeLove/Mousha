<template>
    <div id="ClueSettingInfo">
        <div class="clueSetting">
            <div
                class="clueSetting_item"
                v-for="(setItem, setI) in clueSettingVal"
                :key="setI"
            >
                <div class="clueSetting_item_top">
                    <div class="clueSetting_item_top_left">
                        <!-- <input
                            type="text"
                            v-model="setItem.addressName"
                            :readonly="setItem.status"
                        /> -->
                        <div>{{ setItem.addressName }}</div>
                        <div class="clueSetting_item_top_left_icon">
                            <!-- <img
                                @click="setUpdate(setI)"
                                :src="require('assets/img/ic_update.png')"
                                alt=""
                            /> -->
                            <img
                                v-if="setItem.showRole"
                                @click="showClueSet(setI)"
                                :src="require('assets/img/icon_show.png')"
                                alt=""
                            />
                        </div>
                        <!-- <div
                            class="clueSetting_item_top_left_icon"
                            v-if="setItem.status"
                        >
                            <img
                                @click="setUpdate(setI)"
                                :src="require('assets/img/ic_update.png')"
                                alt=""
                            />
                            <img
                                @click="showClueSet(setI)"
                                :src="require('assets/img/icon_show.png')"
                                alt=""
                            />
                        </div>
                        <div
                            class="clueSetting_item_top_left_btn"
                            v-if="!setItem.status"
                        >
                            <div @click="setCacel(setI)">取消</div>
                            <div @click="setSure(setI)">保存</div>
                        </div> -->
                    </div>
                    <!-- <img
                        class="clueSetting_item_del"
                        @click="delAddrss(setI)"
                        :src="require('assets/img/ic_dels.png')"
                        alt=""
                    /> -->
                </div>
                <div class="clueSetting_item_upload">
                    <div v-if="setItem.clueVal && setItem.clueVal.length > 0">
                        <div
                            class="clueSetting_item_upload_img"
                            v-for="(imgItem, imgI) in setItem.clueVal"
                            :key="imgI"
                            @click="addClues(setI, imgI)"
                        >
                            <!-- <img
                                class="upload_del"
                                @click="delClues(setI, imgI)"
                                :src="require('assets/img/icon_delete.png')"
                                alt=""
                            /> -->
                            <img
                                class="upload_img"
                                :src="imgItem.cluePath"
                                alt=""
                            />
                            <div class="upload_img_btm">
                                <div>{{ imgItem.clueName }}</div>
                                <!-- <img
                                    @click="clueNameUpdate(setI, imgI)"
                                    :src="
                                        require('assets/img/icon_update2.png')
                                    "
                                    alt=""
                                /> -->
                            </div>
                        </div>
                    </div>
                    <!-- <img
                        class="clueSetting_item_upload_img"
                        @click="addClues(setI)"
                        :src="require('assets/img/icon_upload1.png')"
                        alt=""
                    /> -->
                </div>
            </div>
            <!-- <div class="clueSetting_btn" @click="addressAdd">新增地点</div> -->
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_nex" @click="clickNext">编辑</div>
            </div>
        </div>
        <!-- 是否可见 -->
        <el-dialog :visible.sync="isClueShow" width="30%">
            <div class="clueSetpop">
                <div>
                    <div class="tabMain_top_item_title">不可见角色</div>
                    <div class="tabMain_top_item_inp">
                        <span
                            v-for="(item, index) in procedureNode"
                            :key="index"
                            >{{ item }}<span>，</span></span
                        >
                    </div>
                    <!-- <el-select
                        v-model="procedureNode"
                        multiple="multiple"
                        size="2000000"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.num"
                            :label="itemHred.name"
                            :value="itemHred.num"
                        >
                        </el-option>
                    </el-select> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="isClueShow = false"
                    >关闭</el-button
                >
            </span>
        </el-dialog>
        <!-- 线索设置 -->
        <el-dialog :visible.sync="setShow" width="30%">
            <div class="popBox clueSetpop">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索名称</div>
                    <div class="tabMain_top_item_inp">{{ clueName }}</div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">流程节点</div>
                    <div class="tabMain_top_item_down_sel">{{ clueNode }}</div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索详情</div>
                    <div class="tabMain_top_item_inp chapterMain_text">
                        {{ clueMain }}
                    </div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">上传图片</div>
                    <div>
                        <img
                            v-if="cluePath != ''"
                            :src="cluePath"
                            class="uploadImg"
                        />
                    </div>
                </div>
                <div class="clueSetpop_sele">
                    <div>
                        <img
                            v-if="clueSel == 1"
                            :src="require('assets/img/ic_selected.png')"
                            alt=""
                        />
                        <img
                            v-else
                            :src="require('assets/img/ic_select.png')"
                            alt=""
                        />
                        <div>强制公开</div>
                    </div>
                    <div>
                        <img
                            v-if="forceSel == 1"
                            :src="require('assets/img/ic_selected.png')"
                            alt=""
                        />
                        <img
                            v-else
                            :src="require('assets/img/ic_select.png')"
                            alt=""
                        />
                        <div>可深入</div>
                    </div>
                </div>
                <div v-if="forceSel == 1" class="box_child">
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">线索名称</div>
                        <div class="tabMain_top_item_inp">
                            {{ clueNameChild }}
                        </div>
                    </div>
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">线索详情</div>
                        <div class="tabMain_top_item_inp chapterMain_text">
                            {{ clueMainChild }}
                        </div>
                    </div>
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">上传图片</div>
                        <div>
                            <img
                                v-if="cluePaths != ''"
                                :src="cluePaths"
                                class="uploadImg"
                            />
                        </div>
                    </div>
                    <div class="clueSetpop_sele">
                        <div>
                            <img
                                v-if="clueSels == 1"
                                :src="require('assets/img/ic_selected.png')"
                                alt=""
                            />
                            <img
                                v-else
                                :src="require('assets/img/ic_select.png')"
                                alt=""
                            />
                            <div>强制公开</div>
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="setShow = false"
                    >关闭</el-button
                >
            </span>
        </el-dialog>
        <!-- 线索名称修改 -->
        <el-dialog :visible.sync="clueNameShow" width="30%">
            <div class="popBox clueSetpop">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索名称</div>
                    <div class="tabMain_top_item_inp">{{ clueNameVal }}</div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="clueNameShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureClueName"
                    >保存</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
    data() {
        return {
            // 线索设置
            isClueShow: false, //不可见弹窗
            setReadonly: true,
            clueSettingVal: [
                {
                    addressName: "地点名称1",
                    showRole: [],
                    status: true,
                    clueVal: []
                }
            ],
            // 地点索引
            addCluesIndex: "",
            //弹窗线索增加
            // clueSetVal: {},
            clueName: "", //线索名称
            clueNameChild: "", //线索名称
            clueNode: "", //流程节点
            clueMain: "", //线索详情
            clueMainChild: "", //线索详情
            cluePath: "", //图片
            clueSel: "0", //选择
            forceSel: "0", //可深入选择
            clueSels: "0", //选择
            cluePaths: "", //图片s
            pathsId: "", //图片s
            // 起始值
            setVal: "",
            // 新增地址弹窗
            setShow: false,
            // 编辑线索名称弹窗
            clueNameShow: false,
            cluesValIndex: "", //线索索引
            clueNameVal: "",
            manHead: [
                {
                    //人物头像
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
            showRole: [],
            value: "",
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                chapterMain: ""
            },
            procedureNode: [],
            showIndex: -1,
            isSure: false,
            allData: []
        };
    },
    created() {
        this.allData = JSON.parse(localStorage.getItem("data"));
        if (this.allData.clueSettingVal) {
            this.clueSettingVal = this.allData.clueSettingVal;
        }
        this.allData.manDrama.forEach((item, index) => {
            item.num = index;
            this.showRole = this.allData.manDrama;
        });
        this.manHead = this.allData.setArr;
        console.log(this.showRole);
    },
    methods: {
        // 修改地点
        setUpdate(i) {
            this.setVal = this.clueSettingVal[i].addressName;
            this.clueSettingVal[i].status = false;
        },
        // 取消
        setCacel(i) {
            this.clueSettingVal[i].addressName = this.setVal;
            this.clueSettingVal[i].status = true;
        },
        // 保存
        setSure(i) {
            if (this.clueSettingVal[i].addressName == "") {
                Message.error("地点名称不能为空");
            } else {
                this.clueSettingVal[i].status = true;
            }
        },
        // 不可见
        showClueSet(i) {
            this.showIndex = i;
            this.isClueShow = true;
            console.log(this.clueSettingVal);
            this.procedureNode = this.clueSettingVal[i].showRole;
        },
        // 不可见角色确认保存
        sureRole() {
            if (this.procedureNode.length > 0) {
                this.clueSettingVal[
                    this.showIndex
                ].showRole = this.procedureNode;
                this.isClueShow = false;
            } else {
                Message.error("请选择不可见角色");
            }
        },
        // element上传图片
        clueSetSuccess(res, file) {
            if (res.code == 1) {
                this.cluePath = res.data.result.path; //图片
                this.pathId = res.data.result.attachment_id; //图片id
            } else {
                Message.error(res.msg);
            }
        },
        // 限制图片大小
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                Message.error("上传图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                Message.error("上传图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // element上传图片
        clueSuccess(res, file) {
            if (res.code == 1) {
                this.cluePaths = res.data.result.path; //图片
                this.pathsId = res.data.result.attachment_id; //图片id
            } else {
                Message.error(res.msg);
            }
        },
        // 限制图片大小
        beforUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                Message.error("上传图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                Message.error("上传图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // 上传
        setSuccess(res, file) {
            console.log(res, file);
            // this.dataVal.imgPath = URL.createObjectURL(file.raw);
        },
        // 删除线索
        delClues(i, i1) {
            this.clueSettingVal[i].clueVal.splice(i1, 1);
        },

        // 编辑线索名
        clueNameUpdate(i, i1) {
            this.clueNameVal = this.clueSettingVal[i].clueVal[i1].clueName;
            this.addCluesIndex = i;
            this.cluesValIndex = i1;
            this.clueNameShow = true;
        },
        // 确认
        sureClueName() {
            this.clueSettingVal[this.addCluesIndex].clueVal[
                this.cluesValIndex
            ].clueName = this.clueNameVal;
            this.clueNameShow = false;
        },
        // 选择
        clickSel() {
            if (this.clueSel == "1") {
                this.clueSel = "0";
            } else {
                this.clueSel = "1";
            }
        },
        // 选择
        clickSels() {
            if (this.forceSel == "1") {
                this.forceSel = "0";
            } else {
                this.forceSel = "1";
            }
        },
        // 选择
        clickSelds() {
            if (this.clueSels == "1") {
                this.clueSels = "0";
            } else {
                this.clueSels = "1";
            }
        },
        // 新增线索
        addClues(i, i1) {
            // console.log(i);
            // console.log(this.clueSettingVal[i].clueVal[i1]);
            // console.log(this.$refs)
            this.addCluesIndex = i;
            // this.$refs.boxs.scrollTop = 0;
            this.clueName = this.clueSettingVal[i].clueVal[i1].clueName; //线索名称
            this.clueNode = this.clueSettingVal[i].clueVal[i1].clueNode; //流程节点
            this.clueMain = this.clueSettingVal[i].clueVal[i1].clueMain; //线索详情
            this.cluePath = this.clueSettingVal[i].clueVal[i1].cluePath; //图片
            this.pathId = this.clueSettingVal[i].clueVal[i1].pathId; //图片id
            this.clueSel = this.clueSettingVal[i].clueVal[i1].clueSel; //选择
            this.forceSel = this.clueSettingVal[i].clueVal[i1].forceSel; //选择
            if (this.clueSettingVal[i].clueVal[i1].forceSel == "1") {
                this.clueNameChild = this.clueSettingVal[i].clueVal[
                    i1
                ].clueNameChild; //子线索名称
                this.clueMainChild = this.clueSettingVal[i].clueVal[
                    i1
                ].clueMainChild; //子线索详情
                this.cluePaths = this.clueSettingVal[i].clueVal[i1].cluePaths; //子线索图片
                this.pathsId = this.clueSettingVal[i].clueVal[i1].pathsId; //子线索图片id
                this.clueSels = this.clueSettingVal[i].clueVal[i1].clueSels; //子线索选择
            }

            this.setShow = true;
        },
        // 新增地点
        addressAdd() {
            let obj = {
                addressName: "地点名称" + (this.clueSettingVal.length + 1),
                status: true,
                clueVal: []
            };
            this.clueSettingVal.push(obj);
        },
        // 下一步
        clickNext() {
            localStorage.setItem('selRouter','ClueSettingUp')
            this.$router.push({
                path: "/updataScript/ClueSettingUp",
                query: {
                    id: this.allData.basicInfoData.id
                }
            });
        }
    }
};
</script>

<style scoped>
#ClueSettingInfo {
    padding: 20px;
    box-sizing: border-box;
}
.clueSetting {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
    margin-top: 20px;
}
.popBox {
    max-height: 400px;
    overflow-y: scroll;
    padding-right: 20px;
    box-sizing: border-box;
}
.clueSetting_item_top {
    width: 100%;
    height: 50px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
    box-sizing: border-box;
}

.clueSetting_item_del {
    width: 18px;
    height: 18px;
    cursor: pointer;
}

.clueSetting_item_top_left {
    display: flex;
    align-items: center;
}

.clueSetting_item_top_left > div {
    width: 200px;
    min-height: 50px;
    line-height: 50px;
    border: none;
    outline-style: none;
    background: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.clueSetting_item_top_left_title {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
}

.clueSetting_item_top_left_icon {
    display: flex;
    align-items: center;
}

.clueSetting_item_top_left_icon > img:first-child {
    width: 17px;
    height: 20px;
    margin: 0 30px 0 20px;
    cursor: pointer;
}

.clueSetting_item_top_left_icon > img:last-child {
    width: 23px;
    height: 21px;
    cursor: pointer;
}

.clueSetting_item_top_left_btn {
    display: flex;
    align-items: center;
}

.clueSetting_item_top_left_btn > div {
    width: 100px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    cursor: pointer;
}

.clueSetting_item_top_left_btn > div:first-child {
    margin: 0 20px 0 30px;
    border: 1px solid rgba(26, 149, 234, 1);
    color: rgba(26, 149, 234, 1);
}

.clueSetting_item_top_left_btn > div:last-child {
    background: rgba(26, 149, 234, 1);
    color: rgba(255, 255, 255, 1);
}

.clueSetting_btn {
    width: 130px;
    height: 40px;
    background: rgba(26, 149, 234, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin: 35px 0 60px;
    cursor: pointer;
}

.clueSetting_item_upload {
    width: 100%;
    margin-top: 32px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.updataItem .el-upload {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.clueSetting_item_upload > div {
    /* margin: 0 30px 30px 0; */
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.clueSetting_item_upload > img {
    margin-bottom: 30px;
}

.clueSetting_item_upload_img {
    width: 200px;
    height: 240px;
    border-radius: 4px;
    margin: 0 30px 30px 0;
    /* overflow: hidden; */
    position: relative;
}

.upload_del {
    width: 28px;
    height: 28px;
    position: absolute;
    right: -14px;
    top: -14px;
    z-index: 121;
    cursor: pointer;
}

.upload_img {
    width: 200px;
    height: 200px;
    border-radius: 4px 4px 0 0;
    object-fit: cover;
}

.upload_img_btm {
    width: 202px;
    height: 40px;
    margin-top: -5px;
    padding: 0 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(26, 149, 234, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    /* border-radius: 5px; */
    border-radius: 0 0 4px 4px;
}

.upload_img_btm > img {
    width: 17px;
    height: 20px;
    cursor: pointer;
}

.upload_img_btm > div {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
}

.avatar-uploader {
    margin-top: 20px;
}
.tabMain_top_item_title {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 15px;
}
/* 底部按钮 */

.footer_box {
    width: 100%;
    padding: 0 20px 0 40px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
}

.footer_box > div {
    width: 200px;
    height: 50px;
    border-radius: 5px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.footer_cacel {
    background-color: #eeeeee;
    color: rgba(153, 153, 153, 1);
    margin-right: 26px;
}

.footer_nex {
    background-color: #1a95ea;
    color: rgba(255, 255, 255, 1);
    margin-right: 26px;
}
.tabMain_top_item_inp {
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.tabMain_top_item_inp > span:last-child span {
    display: none !important;
}
.tabMain_top_item_down_sel {
    width: 100%;
    padding: 0 20px 0 20px;
    margin-bottom: 20px;
    min-height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
}

.clueSetpop_sele {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.clueSetpop_sele > div {
    display: flex;
    align-items: center;
    margin-right: 50px;
}

.clueSetpop_sele > div > img {
    width: 14px;
    height: 14px;
    margin-right: 8px;
}

.clueSetpop_sele > div > div {
    font-size: 14px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
}
.uploadImg {
    width: 90px;
    height: 90px;
    border-radius: 10px;
    object-fit: cover;
}

.chapterMain_text {
    width: 100%;
    height: 204px;
    padding: 10px 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
    resize: none;
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 24px;
}
.box_child {
    margin-top: 20px;
}
</style>