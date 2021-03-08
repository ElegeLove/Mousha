<template>
    <div>
        <div class="clueSetting">
            <div class="clueSetting_top">
                <el-checkbox v-model="personage.checked">搜身</el-checkbox>
            </div>
            <div v-if="personage.checked">
                <div
                    class="clueSetting_item"
                    v-for="(setItem, setI) in personage.personList"
                    :key="setI"
                >
                    <div class="clueSetting_item_top">
                        <div class="clueSetting_item_top_left">
                            <input
                                type="text"
                                v-model="setItem.addressName"
                                :readonly="setItem.status"
                            />
                            <div
                                class="clueSetting_item_top_left_icon"
                                v-if="setItem.status"
                            >
                                <img
                                    @click="setUpdate(setI, '1')"
                                    :src="require('assets/img/ic_update.png')"
                                    alt=""
                                />
                                <!-- <img
                                    @click="showClueSet(setI)"
                                    :src="require('assets/img/icon_show.png')"
                                    alt=""
                                /> -->
                            </div>
                            <div
                                class="clueSetting_item_top_left_btn"
                                v-if="!setItem.status"
                            >
                                <div @click="setCacel(setI, '1')">取消</div>
                                <div @click="setSure(setI, '1')">保存</div>
                            </div>
                        </div>
                        <!-- <img
                            class="clueSetting_item_del"
                            @click="delAddrss(setI, '1')"
                            :src="require('assets/img/ic_dels.png')"
                            alt=""
                        /> -->
                    </div>
                    <div class="clueSetting_item_upload">
                        <div
                            v-if="setItem.clueVal && setItem.clueVal.length > 0"
                        >
                            <div
                                class="clueSetting_item_upload_img"
                                v-for="(imgItem, imgI) in setItem.clueVal"
                                :key="imgI"
                            >
                                <img
                                    class="upload_del"
                                    @click="delClues(setI, imgI, '1')"
                                    :src="require('assets/img/icon_delete.png')"
                                    alt=""
                                />
                                <img
                                    class="upload_img"
                                    :src="imgItem.cluePath"
                                    alt=""
                                />
                                <div class="upload_img_btm">
                                    <div>{{ imgItem.clueName }}</div>
                                    <img
                                        @click="clueNameUpdate(setI, imgI, '1')"
                                        :src="
                                            require('assets/img/icon_update2.png')
                                        "
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <img
                            class="clueSetting_item_upload_img"
                            @click="addClues(setI, '1')"
                            :src="require('assets/img/icon_upload1.png')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div
                class="clueSetting_item"
                v-for="(setItem, setI) in clueSettingVal"
                :key="setI"
            >
                <div class="clueSetting_item_top">
                    <div class="clueSetting_item_top_left">
                        <input
                            type="text"
                            v-model="setItem.addressName"
                            :readonly="setItem.status"
                        />
                        <div
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
                        </div>
                    </div>
                    <img
                        class="clueSetting_item_del"
                        @click="delAddrss(setI)"
                        :src="require('assets/img/ic_dels.png')"
                        alt=""
                    />
                </div>
                <div class="clueSetting_item_upload">
                    <div v-if="setItem.clueVal && setItem.clueVal.length > 0">
                        <div
                            class="clueSetting_item_upload_img"
                            v-for="(imgItem, imgI) in setItem.clueVal"
                            :key="imgI"
                        >
                            <img
                                class="upload_del"
                                @click="delClues(setI, imgI)"
                                :src="require('assets/img/icon_delete.png')"
                                alt=""
                            />
                            <img
                                class="upload_img"
                                :src="imgItem.cluePath"
                                alt=""
                            />
                            <div class="upload_img_btm">
                                <div>{{ imgItem.clueName }}</div>
                                <img
                                    @click="clueNameUpdate(setI, imgI)"
                                    :src="
                                        require('assets/img/icon_update2.png')
                                    "
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <img
                        class="clueSetting_item_upload_img"
                        @click="addClues(setI)"
                        :src="require('assets/img/icon_upload1.png')"
                        alt=""
                    />
                </div>
            </div>
            <div class="clueSetting_btn" @click="addressAdd">新增地点</div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_nex" @click="clickNext">保存</div>
            </div>
        </div>
        <!-- 是否可见 -->
        <el-dialog :visible.sync="isClueShow" :show-close="false" width="30%">
            <div class="clueSetpop">
                <div>
                    <div class="tabMain_top_item_title">不可见角色</div>
                    <el-select
                        v-model="procedureNode"
                        multiple="multiple"
                        size="2000000"
                        class="pop_sel"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in showRole"
                            :key="itemHred.id"
                            :label="itemHred.name"
                            :value="itemHred.id"
                        >
                        </el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer clueSetpop_btn_box">
                <el-button class="clueSetpop_btn" @click="isClueShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureRole"
                    >保存</el-button
                >
            </span>
        </el-dialog>
        <!-- 线索设置 -->
        <el-dialog :visible.sync="setShow" :show-close="false" width="30%">
            <div class="popBox clueSetpop">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索名称</div>
                    <input
                        v-model="clueName"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">流程节点</div>
                    <el-select
                        class="pop_sel"
                        v-model="clueNode"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="itemHred in manHead"
                            :key="itemHred.id"
                            :label="itemHred.script_node_name"
                            :value="itemHred.id"
                        >
                        </el-option>
                    </el-select>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索详情</div>
                    <textarea
                        v-model="clueMain"
                        class="tabMain_top_item_inp chapterMain_text"
                        type="text"
                        name=""
                        id=""
                    ></textarea>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">上传图片</div>
                    <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :action="urlPath"
                        :on-success="clueSetSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img
                            v-if="cluePath != ''"
                            :src="cluePath"
                            class="uploadImg"
                        />
                        <img
                            v-else
                            class="uploadImg"
                            :src="require('assets/img/icon_upload.png')"
                            alt=""
                        />
                    </el-upload>
                </div>
                <div class="clueSetpop_sele">
                    <div @click="clickSel">
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
                    <div @click="clickSels">
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
                        <input
                            v-model="clueNameChild"
                            class="tabMain_top_item_inp"
                            type="text"
                            name=""
                            id=""
                        />
                    </div>
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">线索详情</div>
                        <textarea
                            v-model="clueMainChild"
                            class="tabMain_top_item_inp chapterMain_text"
                            type="text"
                            name=""
                            id=""
                        ></textarea>
                    </div>
                    <div class="tabMain_top_item">
                        <div class="tabMain_top_item_title">上传图片</div>
                        <el-upload
                            class="avatar-uploader"
                            :action="urlPath"
                            :show-file-list="false"
                            :on-success="clueSuccess"
                            :before-upload="beforUpload"
                        >
                            <img
                                v-if="cluePaths != ''"
                                :src="cluePaths"
                                class="uploadImg"
                            />
                            <img
                                v-else
                                class="uploadImg"
                                :src="require('assets/img/icon_upload.png')"
                                alt=""
                            />
                        </el-upload>
                    </div>
                    <div class="clueSetpop_sele">
                        <div @click="clickSelds">
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
                <el-button class="clueSetpop_btn" @click="setShow = false"
                    >取消</el-button
                >
                <el-button
                    class="clueSetpop_btn"
                    type="primary"
                    @click="sureAddClue"
                    >保存</el-button
                >
            </span>
        </el-dialog>
        <!-- 线索名称修改 -->
        <el-dialog :visible.sync="clueNameShow" width="30%">
            <div class="clueSetpop">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">线索名称</div>
                    <input
                        v-model="clueNameVal"
                        class="tabMain_top_item_inp"
                        type="text"
                        name=""
                        id=""
                    />
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
            allData: [],
            allData: {
                basicInfoData: {},
                setArr: [],
                manDrama: [],
                clueSettingVal: []
            },
            personage: {
                checked: false,
                personList: []
            },
            isPer: "0",
            isUpdata: false,
            urlPath:''
        };
    },
    created() {
        this.urlPath = this.$urlHttp + '/current/upload/index';
        var sHref = window.location.href;
        var args = sHref.split("?");
        var str = args[1];
        var id = "";
        args = str.split("&");
        for (var i = 0; i < args.length; i++) {
            str = args[i];
            var arg = str.split("=");
            if (arg.length <= 1) continue;
            if (arg[0] == "id") id = arg[1];
        }
        this.scriptId = id;
        this.getScriptInfo(id);
    },
    // created() {
    //     this.allData = JSON.parse(localStorage.getItem("data"));
    //     if (this.allData.clueSettingVal) {
    //         this.clueSettingVal = this.allData.clueSettingVal;
    //     }
    //     this.allData.manDrama.forEach((item, index) => {
    //         item.num = index;
    //     });
    //     this.showRole = this.allData.manDrama;
    //     let serData = [];
    //     this.allData.setArr.some(item => {
    //         if (item.node_type == 4) {
    //             serData.push(item);
    //         }
    //     });
    //     this.manHead = serData;
    //     console.log(this.showRole);
    // },
    methods: {
        getScriptInfo(id) {
            let that = this;
            let loadingClose = this.$loading({
                lock: true,
                text: "Loading",
                spinner: "el-icon-loading",
                background: "rgba(0, 0, 0, 0.7)"
            });
            let data = {
                url: "/current/script/details",
                method: "post",
                data: {
                    script_id: id
                }
            };
            this.$apiAxiox(data).then(res => {
                // 剧本基本信息
                that.allData.basicInfoData = {
                    id: res.data.script_result.script_id, //剧本ID
                    name: res.data.script_result.script_name, //剧本名称
                    playsNum: res.data.script_result.people_num, //剧本人数
                    author: res.data.script_result.author, //作者
                    duration: res.data.script_result.duration, //时长
                    difficult: res.data.script_result.difficult_text, //难度
                    fontNum: res.data.script_result.word_num, //字数
                    scriptTagsVal: res.data.script_result.tag_id, //剧本标签
                    roomsNum: res.data.script_result.secret_talk_room_num, //密谈室数量
                    imageUrl: res.data.script_result.cover, //剧本封面
                    imgId: res.data.script_result.cover_id, //剧本封面id
                    storyVal: res.data.script_result.introduction, //故事简介
                    paymentTypeVal: res.data.script_result.pay_type_text, //付费类型
                    criterionPrice: res.data.script_result.standard_price, //标准版价格
                    enjoyPrice: res.data.script_result.enjoy_price, //纷享版价格
                    launchTime: null, //上架时间
                    dataTime: res.data.script_result.on_shelf_time, //上架时间
                    truth_name: res.data.script_result.truth_name, //真相名称
                    truth_content: res.data.script_result.truth_content //真相内容
                };
                // 流程节点
                let arr = [];
                let serData = [];
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
                    if (item.node_type == 4) {
                        serData.push(obj);
                    }
                    arr.push(obj);
                });
                that.allData.setArr = arr;
                that.manHead = serData;

                // 人物剧本
                let arr1 = [];
                let arr2 = [];
                res.data.script_role_list.some((item, index) => {
                    if (item.script_role_list.length > 0) {
                        item.script_role_list.some(itemChild => {
                            let obj1 = {
                                childMode: itemChild.script_node_id, //选择的流程节点数据的键值
                                childModeName: itemChild.script_node_name, //选择的流程节点数据的键值
                                childName: itemChild.name, //章节名称
                                childMain: itemChild.content, //章节内容
                                childId: itemChild.script_role_chapter_id
                            };
                            arr2.push(obj1);
                        });
                    }

                    let obj = {
                        id: item.script_role_id,
                        num: index,
                        name: item.name, //人物姓名
                        describe: item.describe, //人物介绍
                        head_name: item.head_name, //人物头像
                        head_id: item.head_id, //人物头像
                        end_name: item.end_name, //	结局名称
                        end_story: item.end_story, //	结局内容
                        child: arr2
                    };
                    arr1.push(obj);
                });
                that.allData.manDrama = arr1;
                that.showRole = that.allData.manDrama;

                // 线索设置
                let arr3 = [];
                res.data.script_place_list.some(item => {
                    let arr5 = [];
                    let arr4 = [];
                    if (item.clue_list.length > 0) {
                        item.clue_list.some(itemChild => {
                            let obj1 = {};
                            if (itemChild.is_going == 1) {
                                obj1 = {
                                    id: itemChild.script_clue_id,
                                    clueNode: itemChild.script_node_id, //线索的节点数据的键
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
                                    clueNode: itemChild.script_node_id, //线索的节点数据的键
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
                            arr5.push(itemShow.script_role_id);
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
                that.allData.clueSettingVal = arr3;
                that.clueSettingVal = that.allData.clueSettingVal;
                // 新增人物线索
                if (
                    res.data.script_role_clue_list &&
                    res.data.script_role_clue_list.length > 0
                ) {
                    that.checked = true;
                    let person = [];
                    res.data.script_role_clue_list.some(item => {
                        let person1 = [];
                        if (item.script_clue_list.length > 0) {
                            item.script_clue_list.some(itemChild => {
                                let obj1 = {};
                                if (itemChild.is_going == 1) {
                                    obj1 = {
                                        id: itemChild.script_clue_id,
                                        clueNode: itemChild.script_node_id, //线索的节点数据的键
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
                                        clueNode: itemChild.script_node_id, //线索的节点数据的键
                                        clueName: itemChild.name, //线索名称
                                        clueMain: itemChild.detail, //线索详情
                                        pathId: itemChild.attachment_id, //线索图片ID
                                        cluePath: itemChild.attachment, //线索图片ID
                                        clueSel: itemChild.is_open, //是否强制公开【1是0否】
                                        forceSel: itemChild.is_going //是否可深入【1是0否】
                                    };
                                }
                                person1.push(obj1);
                            });
                        }
                        let obj = {
                            addressName: item.script_role_name, //地点名称
                            id: item.script_role_id, //地点id
                            clueVal: person1,
                            status: true
                        };
                        person.push(obj);
                    });
                    let perObj = {
                        checked: that.checked,
                        personList: person
                    };
                    that.allData.personVal = perObj;
                    that.personage = that.allData.personVal;
                } else {
                    let perObj = {
                        checked: false,
                        personList: []
                    };
                    that.allData.personVal = perObj;
                    that.personage = that.allData.personVal;
                }
                // console.log(this.personage)
                this.personage.checked =
                    res.data.role_clue_check == 1 ? true : false;
                loadingClose.close();
            });
        },
        // 修改地点
        setUpdate(i, i1) {
            if (i1 == "1") {
                this.setVal = this.personage.personList[i].addressName;
                this.personage.personList[i].status = false;
            } else {
                this.setVal = this.clueSettingVal[i].addressName;
                this.clueSettingVal[i].status = false;
            }
        },
        // 取消
        setCacel(i, i1) {
            if (i1 == "1") {
                this.personage.personList[i].addressName = this.setVal;
                this.personage.personList[i].status = true;
            } else {
                this.clueSettingVal[i].addressName = this.setVal;
                this.clueSettingVal[i].status = true;
            }
        },
        // 保存
        setSure(i, i1) {
            if (i1 == "1") {
                if (this.personage.personList[i].addressName == "") {
                    Message.error("人物名称不能为空");
                } else {
                    this.personage.personList[i].status = true;
                }
            } else {
                if (this.clueSettingVal[i].addressName == "") {
                    Message.error("人物名称不能为空");
                } else {
                    this.clueSettingVal[i].status = true;
                }
            }
        },
        // 不可见
        showClueSet(i) {
            this.showIndex = i;
            this.isClueShow = true;
            this.procedureNode = this.clueSettingVal[i].showRole;
        },
        // 不可见角色确认保存
        sureRole() {
            this.clueSettingVal[this.showIndex].showRole = this.procedureNode;
            this.isClueShow = false;
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
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     Message.error("上传图片只能是 JPG 格式!");
            // }
            if (!isLt2M) {
                Message.error("上传图片大小不能超过 2MB!");
            }
            return isLt2M;
            // return isJPG && isLt2M;
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
            // const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //     Message.error("上传图片只能是 JPG 格式!");
            // }
            if (!isLt2M) {
                Message.error("上传图片大小不能超过 2MB!");
            }
            return isLt2M;
            // return isJPG && isLt2M;
        },
        // 上传
        setSuccess(res, file) {
            console.log(res, file);
            // this.dataVal.imgPath = URL.createObjectURL(file.raw);
        },
        // 删除线索
        delClues(i, i1, i2) {
            if (i2 == "1") {
                this.personage.personList[i].clueVal.splice(i1, 1);
            } else {
                this.clueSettingVal[i].clueVal.splice(i1, 1);
            }
        },

        // 编辑线索名
        clueNameUpdate(i, i1, i2) {
            this.isUpdata = true;
            if (i2 == "1") {
                // this.clueNameVal = this.personage.personList[i].clueVal[
                //     i1
                // ].clueName;
                console.log(this.personage.personList[i].clueVal[i1]);
                this.isPer = i2;
                this.clueName = this.personage.personList[i].clueVal[
                    i1
                ].clueName; //线索名称
                this.clueNode = this.personage.personList[i].clueVal[
                    i1
                ].clueNode; //流程节点
                this.clueMain = this.personage.personList[i].clueVal[
                    i1
                ].clueMain; //线索详情
                this.cluePath = this.personage.personList[i].clueVal[
                    i1
                ].cluePath; //图片
                this.pathId = this.personage.personList[i].clueVal[i1].pathId; //图片id
                this.clueSel = this.personage.personList[i].clueVal[i1].clueSel; //选择
                this.forceSel = this.personage.personList[i].clueVal[
                    i1
                ].forceSel; //选择
                if (this.personage.personList[i].clueVal[i1].forceSel == 1) {
                    this.clueNameChild = this.personage.personList[i].clueVal[
                        i1
                    ].clueNameChild; //子线索名称
                    this.clueMainChild = this.personage.personList[i].clueVal[
                        i1
                    ].clueMainChild; //子线索详情
                    this.cluePaths = this.personage.personList[i].clueVal[
                        i1
                    ].cluePaths; //子线索图片
                    this.pathsId = this.personage.personList[i].clueVal[
                        i1
                    ].pathsId; //子线索图片id
                    this.clueSels = this.personage.personList[i].clueVal[
                        i1
                    ].clueSels; //子线索选择
                }
            } else {
                // this.clueNameVal = this.clueSettingVal[i].clueVal[i1].clueName;
                // console.log(this.clueSettingVal[i].clueVal[i1]);
                this.isPer = "0";
                this.clueName = this.clueSettingVal[i].clueVal[i1].clueName; //线索名称
                this.clueNode = this.clueSettingVal[i].clueVal[i1].clueNode; //流程节点
                this.clueMain = this.clueSettingVal[i].clueVal[i1].clueMain; //线索详情
                this.cluePath = this.clueSettingVal[i].clueVal[i1].cluePath; //图片
                this.pathId = this.clueSettingVal[i].clueVal[i1].pathId; //图片id
                this.clueSel = this.clueSettingVal[i].clueVal[i1].clueSel; //选择
                this.forceSel = this.clueSettingVal[i].clueVal[i1].forceSel; //选择
                if (this.clueSettingVal[i].clueVal[i1].forceSel == 1) {
                    this.clueNameChild = this.clueSettingVal[i].clueVal[
                        i1
                    ].clueNameChild; //子线索名称
                    this.clueMainChild = this.clueSettingVal[i].clueVal[
                        i1
                    ].clueMainChild; //子线索详情
                    this.cluePaths = this.clueSettingVal[i].clueVal[
                        i1
                    ].cluePaths; //子线索图片
                    this.pathsId = this.clueSettingVal[i].clueVal[i1].pathsId; //子线索图片id
                    this.clueSels = this.clueSettingVal[i].clueVal[i1].clueSels; //子线索选择
                }
            }
            // debugger;
            // this.addCluesIndex = i;
            // this.clueNameShow = true;

            this.addCluesIndex = i;
            this.cluesValIndex = i1;
            this.setShow = true;
            // if (i2 == "1") {
            //     this.isPer = i2;
            // } else {
            //     this.isPer = "0";
            // }
        },
        // 确认
        sureClueName() {
            if (this.isPer == "1") {
                this.personage.personList[this.addCluesIndex].clueVal[
                    this.cluesValIndex
                ].clueName = this.clueNameVal;
            } else {
                this.clueSettingVal[this.addCluesIndex].clueVal[
                    this.cluesValIndex
                ].clueName = this.clueNameVal;
            }
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
            this.isUpdata = false;
            this.addCluesIndex = i;
            this.clueName = ""; //线索名称
            this.clueNode = ""; //流程节点
            this.clueMain = ""; //线索详情
            this.cluePath = ""; //图片
            this.pathId = ""; //图片id
            this.clueSel = "0"; //选择
            this.forceSel = "0"; //选择
            this.clueNameChild = ""; //子线索名称
            this.clueMainChild = ""; //子线索详情
            this.cluePaths = ""; //子线索图片
            this.pathsId = ""; //子线索图片id
            this.clueSels = "0"; //子线索选择
            this.setShow = true;
            if (i1 == "1") {
                this.isPer = i1;
            } else {
                this.isPer = "0";
            }
        },
        // 确认增加
        sureAddClue() {
            let obj = {
                clueName: this.clueName,
                clueNode: this.clueNode,
                clueMain: this.clueMain,
                cluePath: this.cluePath,
                pathId: this.pathId,
                clueSel: this.clueSel,
                forceSel: this.forceSel,
                clueNameChild: this.clueNameChild,
                clueMainChild: this.clueMainChild,
                cluePaths: this.cluePaths,
                pathsId: this.pathsId,
                clueSels: this.clueSels
            };
            // console.log(obj)
            if (this.clueName == "") {
                Message.error("请输入线索名称");
                return;
            } else if (this.clueNode == "") {
                if (this.manHead.length > 0) {
                    Message.error("请选择流程节点");
                    return;
                } else {
                    Message.error("请到流程节点模块添加搜证类型的节点");
                    return;
                }
            } else if (this.clueMain == "") {
                Message.error("请输入线索详情");
                return;
            } else if (this.cluePath == "") {
                Message.error("请上传图片");
                return;
            } else if (this.forceSel == "1") {
                if (this.clueNameChild == "") {
                    Message.error("请输入子线索名称");
                    return;
                } else if (this.clueMainChild == "") {
                    Message.error("请输入子线索详情");
                    return;
                } else if (this.cluePaths == "") {
                    Message.error("请上传子线索图片");
                    return;
                }
            }
            if (this.isUpdata) {
                if (this.isPer == "1") {
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueName = this.clueName;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueNode = this.clueNode;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueMain = this.clueMain;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].cluePath = this.cluePath;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].pathId = this.pathId;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueSel = this.clueSel;
                    this.personage.personList[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].forceSel = this.forceSel;
                    if (
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].forceSel == 1
                    ) {
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueNameChild = this.clueNameChild;
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueMainChild = this.clueMainChild;
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].cluePaths = this.cluePaths;
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].pathsId = this.pathsId;
                        this.personage.personList[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueSels = this.clueSels;
                    }
                } else {
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueName = this.clueName;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueNode = this.clueNode;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueMain = this.clueMain;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].cluePath = this.cluePath;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].pathId = this.pathId;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].clueSel = this.clueSel;
                    this.clueSettingVal[this.addCluesIndex].clueVal[
                        this.cluesValIndex
                    ].forceSel = this.forceSel;
                    if (
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].forceSel == 1
                    ) {
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueNameChild = this.clueNameChild;
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueMainChild = this.clueMainChild;
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].cluePaths = this.cluePaths;
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].pathsId = this.pathsId;
                        this.clueSettingVal[this.addCluesIndex].clueVal[
                            this.cluesValIndex
                        ].clueSels = this.clueSels;
                    }
                }
            } else {
                if (this.isPer == "1") {
                    this.personage.personList[this.addCluesIndex].clueVal.push(
                        obj
                    );
                } else {
                    this.clueSettingVal[this.addCluesIndex].clueVal.push(obj);
                }
            }
            this.setShow = false;
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
        // 删除地点
        delAddrss(i, i1) {
            if (i1 == "1") {
                this.personage.personList.splice(i, 1);
                // this.personage.personList.forEach((item, index) => {
                //     item.addressName = "地点名称" + (index + 1);
                // });
            } else {
                this.clueSettingVal.splice(i, 1);
                this.clueSettingVal.forEach((item, index) => {
                    item.addressName = "地点名称" + (index + 1);
                });
            }
        },

        // 下一步
        clickNext() {
            // console.log(this.clueSettingVal);
            let that = this;
            this.allData.personVal = this.personage;
            this.allData.clueSettingVal = this.clueSettingVal;
            localStorage.setItem("data", JSON.stringify(this.allData));
            //paymentTypeVal: "", //付费类型 difficult
            // 线索设置
            let arr3 = []; //地点
            this.allData.clueSettingVal.some((item, index) => {
                let arr4 = []; //线索
                if (item.clueVal.length > 0) {
                    item.clueVal.some(itemChild => {
                        // console.log(this.allData.clueSettingVal)
                        // console.log(itemChild)
                        // debugger
                        let obj1 = {};
                        if (itemChild.forceSel == "1") {
                            obj1 = {
                                script_clue_name: itemChild.clueName, //线索名称
                                detail: itemChild.clueMain, //线索详情
                                clue_type: "0",
                                attachment: itemChild.pathId, //线索图片ID
                                script_node_id: itemChild.clueNode, //线索的节点数据的键
                                is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                is_going: itemChild.forceSel, //是否可深入【1是0否】
                                child_script_clue_name: itemChild.clueNameChild, //深入线索的子线索名称
                                child_attachment: itemChild.pathsId, //深入线索的子线索图片ID
                                child_is_open: itemChild.clueSels, //深入线索的子线索-是否强制公开【1是0否】
                                child_detail: itemChild.clueMainChild, //深入线索的子线索详情
                                script_clue_id: itemChild.id, //线索的id
                                child_script_clue_id: itemChild.childId //子线索id
                            };
                        } else {
                            obj1 = {
                                clue_type: "0",
                                script_clue_name: itemChild.clueName, //线索名称
                                detail: itemChild.clueMain, //线索详情
                                script_node_id: itemChild.clueNode, //线索的节点数据的键
                                attachment: itemChild.pathId, //线索图片ID
                                is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                is_going: itemChild.forceSel, //是否可深入【1是0否】
                                script_clue_id: itemChild.id //线索的id
                            };
                        }
                        // if (itemChild.id && itemChild.id != "") {
                        //     obj1.script_node_id = itemChild.id; //线索的节点数据的键
                        // } else {
                        //     obj1.script_node_id = itemChild.clueNode; //线索的节点数据的键
                        // }
                        if (item.id && item.id != "") {
                            obj1.script_place_id = item.id;
                        } else {
                            obj1.script_place_key = index;
                        }
                        arr4.push(obj1);
                    });
                }
                let obj = {
                    script_place_name: item.addressName, //地点名称
                    no_script_role_id: item.showRole, //选择的不可见角色数据的键|[0,1]
                    script_place_id: item.id, //地点id
                    script_clue_data: arr4
                };
                arr3.push(obj);
            });
            // 新增人物线索
            let person = [];
            if (this.allData.personVal.checked) {
                this.allData.personVal.personList.some((item, index) => {
                    let arr4 = []; //线索
                    if (item.clueVal.length > 0) {
                        item.clueVal.some(itemChild => {
                            let obj1 = {};
                            if (itemChild.forceSel == "1") {
                                obj1 = {
                                    script_clue_name: itemChild.clueName, //线索名称
                                    detail: itemChild.clueMain, //线索详情
                                    clue_type: "1",
                                    attachment: itemChild.pathId, //线索图片ID
                                    script_node_id: itemChild.clueNode, //线索的节点数据的键
                                    is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                    is_going: itemChild.forceSel, //是否可深入【1是0否】
                                    script_clue_id: itemChild.id, //线索的id
                                    child_script_clue_name:
                                        itemChild.clueNameChild, //深入线索的子线索名称
                                    child_attachment: itemChild.pathsId, //深入线索的子线索图片ID
                                    child_is_open: itemChild.clueSels, //深入线索的子线索-是否强制公开【1是0否】
                                    child_detail: itemChild.clueMainChild, //深入线索的子线索详情
                                    child_script_clue_id: itemChild.childId //子线索id
                                };
                            } else {
                                obj1 = {
                                    clue_type: "1",
                                    script_clue_name: itemChild.clueName, //线索名称
                                    detail: itemChild.clueMain, //线索详情
                                    script_node_id: itemChild.clueNode, //线索的节点数据的键
                                    attachment: itemChild.pathId, //线索图片ID
                                    is_open: itemChild.clueSel, //是否强制公开【1是0否】
                                    is_going: itemChild.forceSel, //是否可深入【1是0否】
                                    script_clue_id: itemChild.id //线索的id
                                };
                            }
                            // if (itemChild.id && itemChild.id != "") {
                            //     obj1.script_node_id = itemChild.id; //线索的节点数据的键
                            // } else {
                            //     obj1.script_node_id = itemChild.clueNode; //线索的节点数据的键
                            // }
                            // if (item.id && item.id != "") {
                            //     obj1.script_place_id = item.id;
                            // } else {
                            //     obj1.script_place_key = index;
                            // }
                            arr4.push(obj1);
                        });
                    }
                    let obj = {
                        script_role_id: item.id, //	角色ID
                        script_clue_data: arr4 //人物线索的线索数据
                    };
                    person.push(obj);
                });
            }

            let dataObj = {
                script_id: this.allData.basicInfoData.id,
                script_place_data: arr3,
                script_role_clue_data: person
            };
            let data = {
                url: "/current/script/edit",
                method: "post",
                data: {
                    add_script_data: JSON.stringify(dataObj)
                }
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    // let arr = [{ semester: "全部" }];
                    // that.semesterList = arr.concat(res.data.data);
                    Message.success(res.data.msg);
                } else {
                    // that.$message.error(res.data.msg);
                    Message.error(res.data.msg);
                }
            });
        }
    }
};
</script>

<style scoped>
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

.clueSetting_item_top_left > input {
    width: 200px;
    height: 50px;
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
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.tabMain_top_item_down_sel {
    width: 100%;
    padding: 0 20px 0 20px;
    margin-bottom: 20px;
    height: 50px;
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
.clueSetpop_btn_box {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.clueSetpop_btn {
    width: 150px;
    height: 50px;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
}
.pop_sel {
    width: 100%;
    /* padding: 0 20px 0 20px; */
    margin-top: 15px;
    height: 100%;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    margin-bottom: 10px;
}
.clueSetting_top {
    margin: 20px;
}
</style>