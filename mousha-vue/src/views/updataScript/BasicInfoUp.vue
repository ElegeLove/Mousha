<template>
    <div class="container">
        <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
        >
            <div class="main_top">
                <el-form-item prop="name">
                    <div class="tabMain_top_item">剧本名称</div>
                    <el-input class="inps" v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="playsNum">
                    <div class="tabMain_top_item">剧本人数</div>
                    <div class="inps">{{ ruleForm.playsNum }}</div>
                </el-form-item>
                <el-form-item prop="author">
                    <div class="tabMain_top_item">作者</div>
                    <!-- <el-input class="inps" v-model="ruleForm.author"></el-input> -->
                    <el-autocomplete
                        v-model="ruleForm.author"
                        :fetch-suggestions="querySearchAsync"
                        @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
                <el-form-item prop="duration">
                    <div class="tabMain_top_item">时长</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.duration"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="difficult">
                    <div class="tabMain_top_item">难度</div>
                    <el-select
                        v-model="ruleForm.difficult"
                        class="inps"
                    >
                        <el-option
                            v-for="item in difficulty"
                            :key="item.num"
                            :label="item.name"
                            :value="item.num"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="fontNum">
                    <div class="tabMain_top_item">字数</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.fontNum"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="scriptTagsVal">
                    <div class="tabMain_top_item">剧本标签</div>
                    <el-select
                        v-model="ruleForm.scriptTagsVal"
                        class="inps"
                    >
                        <el-option
                            v-for="item in scriptTags"
                            :key="item.tag_id"
                            :label="item.name"
                            :value="item.tag_id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="roomsNum">
                    <div class="tabMain_top_item">密谈室数量</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.roomsNum"
                    ></el-input>
                </el-form-item>
            </div>
            <el-form-item prop="imageUrl">
                <div class="tabMain_top_item">剧本封面</div>
                <el-upload
                    class="avatar-uploader"
                    :action="urlPath"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <!-- :before-upload="beforeAvatarUpload" -->
                    <img
                        v-if="ruleForm.imageUrl != ''"
                        :src="ruleForm.imageUrl"
                        class="uploadImg"
                    />
                    <img
                        v-else
                        class="uploadImg"
                        :src="require('assets/img/icon_upload.png')"
                        alt=""
                    />
                </el-upload>
            </el-form-item>
            <el-form-item prop="storyVal">
                <div class="tabMain_top_item">故事简介</div>
                <!-- <el-input
                    class="areaInps"
                    type="textarea"
                    v-model="ruleForm.storyVal"
                ></el-input> -->
                <div class="areaInps">
                    <quill-editor
                        v-model="ruleForm.storyVal"
                        :options="editorOption"
                        ref="QuillEditor"
                    >
                    </quill-editor>
                </div>
            </el-form-item>
            <div class="main_top">
                <el-form-item prop="paymentTypeVal">
                    <div class="tabMain_top_item">付费类型</div>
                    <el-select
                        v-model="ruleForm.paymentTypeVal"
                        class="inps"
                    >
                        <el-option
                            v-for="item in paymentType"
                            :key="item.num"
                            :label="item.name"
                            :value="item.num"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    prop="criterionPrice"
                    v-if="ruleForm.paymentTypeVal == 1"
                >
                    <div class="tabMain_top_item">标准版价格</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.criterionPrice"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="criterionOldPrice"
                    v-if="ruleForm.paymentTypeVal == 1"
                >
                    <div class="tabMain_top_item">标准版原价格</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.criterionOldPrice"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    prop="enjoyPrice"
                    v-if="ruleForm.paymentTypeVal == 1"
                >
                    <div class="tabMain_top_item">纷享版价格</div>
                    <el-input
                        class="inps"
                        v-model="ruleForm.enjoyPrice"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="launchTime">
                    <div class="tabMain_top_item">上架时间</div>
                    <el-date-picker
                        v-model="ruleForm.launchTime"
                        class="pick_time"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        @change="dataTimes"
                    >
                    </el-date-picker>
                </el-form-item>
            </div>
            <el-form-item>
                <!-- <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >下一步</el-button
                > -->

                <div class="footer_box">
                    <div class="footer_nex" @click="submitForm('ruleForm')">
                        保存
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from "element-ui";
const toolbarOptions = [
    ["bold", "italic"], // toggled buttons
    // ["bold", "italic", "underline", "strike"], // toggled buttons
    // ["blockquote", "code-block"],

    // [{ header: 1 }, { header: 2 }], // custom button values
    // [{ list: "ordered" }, { list: "bullet" }],
    // [{ script: "sub" }, { script: "super" }], // superscript/subscript
    // [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    // [{ direction: "rtl" }], // text direction

    // [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    // [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }] // dropdown with defaults from theme
    // [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    // [{ font: [] }],
    // [{ align: [] }],

    // ["clean"] // remove formatting button
];
export default {
    data() {
        return {
            ruleForm: {
                name: "", //剧本名称
                playsNum: "", //剧本人数
                author: "", //作者
                duration: "", //时长
                difficult: -1, //难度
                fontNum: "", //字数
                scriptTagsVal: "", //剧本标签
                roomsNum: "", //密谈室数量
                imageUrl: "", //剧本封面
                imgId: "", //剧本封面id
                storyVal: "", //故事简介
                paymentTypeVal: "", //付费类型
                criterionPrice: "", //标准版价格
                criterionOldPrice: "", //标准版原价格
                enjoyPrice: "", //纷享版价格
                launchTime: null, //上架时间
                dataTime: "", //上架时间
                truth_name: "", //真相名称
                truth_content: "" //真相内容
            },
            difficulty: [
                {
                    //难度
                    name: "入门",
                    num: 0
                },
                {
                    name: "简单",
                    num: 1
                },
                {
                    name: "中等",
                    num: 2
                },
                {
                    name: "困难",
                    num: 3
                },
                {
                    name: "烧脑",
                    num: 4
                }
            ],
            scriptTags: [
                // {
                //     //剧本标签
                //     name: 111,
                //     tag_id:''
                // },
            ],
            paymentType: [
                {
                    //付费类型
                    name: "付费",
                    num: 1
                },
                {
                    name: "免费",
                    num: 0
                }
            ],
            editorOption: {
                placeholder: "请输入",
                modules: {
                    toolbar: {
                        container: toolbarOptions // 工具栏
                    }
                }
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入剧本名称",
                        trigger: "blur"
                    }
                ],
                playsNum: [
                ],
                author: [
                    {
                        required: true,
                        message: "请输入作者名称",
                        trigger: "change"
                    }
                ],
                duration: [
                    {
                        required: true,
                        message: "请输入时长",
                        trigger: "blur"
                    },
                    {
                        required: true,
                        max: 1,
                        pattern: /^(\d+\.\d{1,1}|\d+)$/,
                        message: "只能输入数字，可以小数点后一位",
                        trigger: "blur"
                    }
                    // {
                    //     required: true,
                    //     max: 1,
                    //     pattern: /^(?:1|[1-8]?|8)$/,
                    //     message: "只能输入0~8的正整数",
                    //     trigger: "blur"
                    // }
                ],
                difficult: [
                    {
                        required: true,
                        message: "请选择难度",
                        trigger: "change"
                    }
                ],
                fontNum: [
                    {
                        required: true,
                        message: "请输入字数",
                        trigger: "blur"
                    },
                    {
                        required: true,
                        max: 1,
                        pattern: /^[0-9]*[1-9][0-9]*$/,
                        message: "仅支持输入正整数",
                        trigger: "blur"
                    }
                ],
                scriptTagsVal: [
                    {
                        required: true,
                        message: "请选择剧本标签",
                        trigger: "change"
                    }
                ],
                roomsNum: [
                    {
                        required: true,
                        message: "请输入密谈室数量",
                        trigger: "blur"
                    },
                    {
                        required: true,
                        max: 1,
                        pattern: /^(0|\+?[0-9]*)$/,
                        message: "支持0-9的正整数",
                        trigger: "blur"
                    }
                ],
                imageUrl: [
                    {
                        required: true,
                        message: "请上传剧本封面",
                        trigger: "change"
                    }
                ],
                storyVal: [
                    {
                        required: true,
                        message: "请输入故事简介",
                        trigger: "blur"
                    }
                ],
                paymentTypeVal: [
                    {
                        required: true,
                        message: "请选择付费类型",
                        trigger: "change"
                    }
                ],
                criterionPrice: [
                    {
                        required: true,
                        message: "请输入标准版价格",
                        trigger: "blur"
                    }
                ],
                criterionOldPrice: [
                    {
                        required: true,
                        message: "请输入标准版原价格",
                        trigger: "blur"
                    }
                ],
                enjoyPrice: [
                    {
                        required: true,
                        message: "请输入纷享版价格",
                        trigger: "blur"
                    }
                ],
                launchTime: [
                    {
                        required: true,
                        message: "请选择上架时间",
                        trigger: "change"
                    }
                ]
            },
            allData: {},
            authorList:[],
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
        this.getmanList();
        this.getScriptInfo(id);
        
    },
    mounted () {
        this.getAuthor();
    },
    // mounted() {
    //     if (localStorage.getItem("data")) {
    //         this.ruleForm = JSON.parse(
    //             localStorage.getItem("data")
    //         ).basicInfoData;
    //         let time = JSON.parse(localStorage.getItem("data")).basicInfoData
    //             .dataTime;
    //         this.ruleForm.launchTime = this.$moment(time);
    //     }
    //     this.getmanList();
    // },
    methods: {
        // 作者
        querySearchAsync(queryString, cb) {
            var restaurants = this.authorList;
            var results = queryString
                ? restaurants.filter(this.createStateFilter(queryString))
                : restaurants;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                cb(results);
            }, 2000 * Math.random());
        },
        createStateFilter(queryString) {
            return state => {
                return state.value.indexOf(queryString) === 0;
            };
        },
        handleSelect(item) {
            // console.log(item);
            // console.log(this.ruleForm.author);
        },
        // 获取作者
        getAuthor() {
            let that = this;
            let data = {
                url: "/current/index/user_list",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    res.data.data.list.some(item => {
                        item.value = item.nickname;
                    });
                    that.authorList = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
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
                    difficult: res.data.script_result.difficult, //难度
                    // difficult: res.data.script_result.difficult_text, //难度
                    fontNum: res.data.script_result.word_num, //字数
                    scriptTagsVal: res.data.script_result.tag_id, //剧本标签
                    roomsNum: res.data.script_result.secret_talk_room_num, //密谈室数量
                    imageUrl: res.data.script_result.cover, //剧本封面
                    imgId: res.data.script_result.cover_id, //剧本封面id
                    storyVal: res.data.script_result.introduction, //故事简介
                    paymentTypeVal: res.data.script_result.pay_type, //付费类型
                    criterionPrice: res.data.script_result.standard_price, //标准版价格
                    criterionOldPrice: res.data.script_result.standard_price_original, //标准版原价格
                    enjoyPrice: res.data.script_result.enjoy_price, //纷享版价格
                    launchTime: null, //上架时间
                    dataTime: res.data.script_result.on_shelf_time, //上架时间
                    truth_name: res.data.script_result.truth_name, //真相名称
                    truth_content: res.data.script_result.truth_content //真相内容
                };
                that.ruleForm = that.allData.basicInfoData;
                let time = that.allData.basicInfoData.dataTime;
                that.ruleForm.launchTime = this.$moment(time);
                // localStorage.setItem("data", JSON.stringify(that.allData));
                loadingClose.close();
            });
        },
        //获取剧本人数
        getScriptNum(e) {
            let num = parseInt(e.target.value);
            let arr = [];
            for (let i = 0; i < num; i++) {
                let obj = {
                    name: "人物" + (i + 1) + "姓名", //人物姓名
                    nameVal: "", //人物姓名
                    introduce: "人物" + (i + 1) + "介绍", //人物介绍
                    introduceVal: "", //人物介绍
                    head: "人物" + (i + 1) + "头像", //人物头像
                    headVal: "", //人物头像
                    childVal: "人物" + (i + 1) + "剧本", //人物剧本
                    child: [
                        //人物剧本
                    ]
                };
                arr.push(obj);
            }
            this.manDrama = arr;
        },
        getmanList() {
            let that = this;
            let data = {
                url: "/current/script/script_tag_list",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.scriptTags = res.data.data.list;
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        // element上传图片
        handleAvatarSuccess(res, file) {
            if (res.code == 1) {
                this.ruleForm.imgId = res.data.result.attachment_id;
                this.ruleForm.imageUrl = res.data.result.path;
            } else {
                Message.error(res.msg);
            }
        },
        // 限制图片大小
        // beforeAvatarUpload(file) {
        //     const isJPG = file.type === "image/jpeg";
        //     // const isLt2M = file.size / 1024 / 1024 < 2;

        //     if (!isJPG) {
        //         Message.error("上传图片只能是 JPG 格式!");
        //     }
        //     // if (!isLt2M) {
        //     //     Message.error("上传图片大小不能超过 2MB!");
        //     // }
        //     return isJPG;
        //     // return isJPG && isLt2M;
        // },
        dataTimes(e) {
            this.ruleForm.dataTime = this.$moment(e).format("YYYY-MM-DD HH:mm");
        },
        //表单提交
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let obj = {};
                    if (localStorage.getItem("data")) {
                        obj = JSON.parse(localStorage.getItem("data"));
                        obj.basicInfoData = this.ruleForm;
                    } else {
                        obj = {
                            basicInfoData: this.ruleForm
                        };
                    }
                    localStorage.setItem("data", JSON.stringify(obj));
                    let that = this;
                    let dataObj = {
                        script_id: this.ruleForm.id, //剧本ID
                        script_data: {
                            script_id: this.ruleForm.id, //剧本ID
                            script_name: this.ruleForm.name, //剧本名称
                            people_num: this.ruleForm.playsNum, //剧本人数
                            author: this.ruleForm.author, //作者
                            difficult: this.ruleForm.difficult, //难度
                            duration: this.ruleForm.duration, //时长
                            secret_talk_room_num: this.ruleForm.roomsNum, //密谈室数量
                            introduction: this.ruleForm.storyVal, //故事简介
                            word_num: this.ruleForm.fontNum, //字数
                            tag_id: this.ruleForm.scriptTagsVal, //标签id
                            cover: this.ruleForm.imgId, //封面
                            pay_type: this.ruleForm.paymentTypeVal, //付费类型:0免费1付费
                            on_shelf_time: this.ruleForm.dataTime, //上架时间
                            truth_name: this.ruleForm.truth_name, //真相名称
                            truth_content: this.ruleForm.truth_content //真相内容
                        }
                    };
                    if (this.ruleForm.paymentTypeVal == 1) {
                        dataObj.script_data.standard_price = this.ruleForm.criterionPrice;
                        dataObj.script_data.enjoy_price = this.ruleForm.enjoyPrice;
                        dataObj.script_data.standard_price_original = this.ruleForm.criterionOldPrice;
                    }
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
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>
<style>
select {
    padding-right: 20px !important;
}
.edit_container,
.quill-editor {
    height: 300px;
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
    content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
    content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
    content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: "文本" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: "标题1" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: "标题2" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: "标题3" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: "标题4" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: "标题5" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: "标题6" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: "标准字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
    content: "衬线字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
    content: "等宽字体" !important;
}
</style>
<style lang="scss" scoped>
.container {
    flex: 1;
    padding-right: 10%;
    padding-left: 40px;
    padding-top: 38px;
}
.basic-item {
    padding-bottom: 20px;
    .basic-item-label {
        font-size: 16px;
        margin-bottom: 10px;
    }
}
.main_top {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.inps {
    width: 260px;
    height: 50px;
    border-radius: 4px;
}
.tabMain_top_item {
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 15px;
}
.uploadImg {
    width: 90px;
    height: 90px;
    border-radius: 10px;
}
.areaInps {
    width: 100%;
    height: 190px;
    font-size: 16px;
}
/* 底部按钮 */

.footer_box {
    width: 100%;
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
.areaInps {
    width: 100%;
    height: 350px;
}
</style>
