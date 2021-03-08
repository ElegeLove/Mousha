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
                    <div class="inps">{{ ruleForm.name }}</div>
                </el-form-item>
                <el-form-item prop="playsNum">
                    <div class="tabMain_top_item">剧本人数</div>
                    <div class="inps">{{ ruleForm.playsNum }}</div>
                </el-form-item>
                <el-form-item prop="author">
                    <div class="tabMain_top_item">作者</div>
                    <div class="inps">{{ ruleForm.author }}</div>
                </el-form-item>
                <el-form-item prop="duration">
                    <div class="tabMain_top_item">时长</div>
                    <div class="inps">{{ ruleForm.duration }}</div>
                </el-form-item>
                <el-form-item prop="difficult">
                    <div class="tabMain_top_item">难度</div>
                    <div class="inps">{{ ruleForm.difficult }}</div>
                </el-form-item>
                <el-form-item prop="fontNum">
                    <div class="tabMain_top_item">字数</div>
                    <div class="inps">{{ ruleForm.fontNum }}</div>
                </el-form-item>
                <el-form-item prop="scriptTagsVal">
                    <div class="tabMain_top_item">剧本标签</div>
                    <div class="inps">{{ ruleForm.scriptTagsVal }}</div>
                </el-form-item>
                <el-form-item prop="roomsNum">
                    <div class="tabMain_top_item">密谈室数量</div>
                    <div class="inps">{{ ruleForm.roomsNum }}</div>
                </el-form-item>
            </div>
            <el-form-item prop="imageUrl">
                <div class="tabMain_top_item">剧本封面</div>
                <div class="avatar-uploader">
                    <img
                        v-if="ruleForm.imageUrl != ''"
                        :src="ruleForm.imageUrl"
                        class="uploadImg"
                    />
                </div>
            </el-form-item>
            <el-form-item prop="storyVal">
                <div class="tabMain_top_item">故事简介</div>
                <div class="areaInps" v-html="ruleForm.storyVal"></div>
            </el-form-item>
            <div class="main_top">
                <el-form-item prop="paymentTypeVal">
                    <div class="tabMain_top_item">付费类型</div>
                    <div class="inps">{{ ruleForm.paymentTypeVal }}</div>
                </el-form-item>
                <el-form-item
                    prop="criterionPrice"
                    v-if="ruleForm.pay_type == 1"
                >
                    <div class="tabMain_top_item">标准版价格</div>
                    <div class="inps">{{ ruleForm.criterionPrice }}</div>
                </el-form-item>
                <el-form-item
                    prop="criterionPrice"
                    v-if="ruleForm.pay_type == 1"
                >
                    <div class="tabMain_top_item">标准版原价格</div>
                    <div class="inps">{{ ruleForm.criterionOldPrice }}</div>
                </el-form-item>
                <el-form-item prop="enjoyPrice" v-if="ruleForm.pay_type == 1">
                    <div class="tabMain_top_item">纷享版价格</div>
                    <div class="inps">{{ ruleForm.enjoyPrice }}</div>
                </el-form-item>
                <el-form-item prop="launchTime">
                    <div class="tabMain_top_item">上架时间</div>
                    <div class="inps">{{ ruleForm.dataTime }}</div>
                </el-form-item>
            </div>
            <el-form-item>
                <!-- <el-button @click="resetForm('ruleForm')">取消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >下一步</el-button
                > -->

                <div class="footer_box">
                    <!-- <div class="footer_cacel" @click="resetForm('ruleForm')">
                        取消
                    </div> -->
                    <div class="footer_nex" @click="submitForm('ruleForm')">
                        编辑
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
    data() {
        return {
            ruleForm: {
                name: "", //剧本名称
                playsNum: "", //剧本人数
                author: "", //作者
                duration: "", //时长
                difficult: "", //难度
                fontNum: "", //字数
                scriptTagsVal: "", //剧本标签
                roomsNum: "", //密谈室数量
                imageUrl: "", //剧本封面
                imgId: "", //剧本封面id
                storyVal: "", //故事简介
                paymentTypeVal: "", //付费类型
                criterionPrice: "", //标准版价格
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
                    num: "0"
                },
                {
                    name: "简单",
                    num: "1"
                },
                {
                    name: "中等",
                    num: "2"
                },
                {
                    name: "困难",
                    num: "3"
                },
                {
                    name: "烧脑",
                    num: "4"
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
                    num: "1"
                },
                {
                    name: "免费",
                    num: "0"
                }
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入剧本名称",
                        trigger: "blur"
                    }
                ],
                playsNum: [
                    {
                        required: true,
                        message: "请输入剧本人数",
                        trigger: "blur"
                    }
                ],
                author: [
                    {
                        required: true,
                        message: "请输入作者名称",
                        trigger: "blur"
                    }
                ],
                duration: [
                    {
                        required: true,
                        message: "请输入时长",
                        trigger: "blur"
                    }
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
            allData: {}
        };
    },
    created() {
        // this.ruleForm = JSON.parse(localStorage.getItem("data")).basicInfoData;
        // let time = JSON.parse(localStorage.getItem("data")).basicInfoData
        //     .dataTime;
        // this.ruleForm.launchTime = this.$moment(time);
        
    },
    mounted () {
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
        this.getScriptInfo(id)
    },
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
                    scriptTagsVal: res.data.script_result.tag_text, //剧本标签
                    roomsNum: res.data.script_result.secret_talk_room_num, //密谈室数量
                    imageUrl: res.data.script_result.cover, //剧本封面
                    imgId: res.data.script_result.cover_id, //剧本封面id
                    storyVal: res.data.script_result.introduction, //故事简介
                    pay_type: res.data.script_result.pay_type, //付费类型
                    paymentTypeVal: res.data.script_result.pay_type_text, //付费类型
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
                that.ruleForm.launchTime = that.$moment(time);
                localStorage.setItem("data", JSON.stringify(that.allData));
                loadingClose.close();
            });
        },
        //表单提交
        submitForm(formName) {
            localStorage.setItem('selRouter','BasicInfoUp')
            this.$router.push({
                path: "/updataScript/BasicInfoUp",
                query: {
                    id: this.ruleForm.id
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    // flex: 1;
    // padding-right: 10%;
    // padding-left: 40px;
    // padding-top: 38px;
    padding: 20px;
    box-sizing: border-box;
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
    min-height: 190px;
    background: #f5f5f5;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    padding: 20px 30px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: "PingFang SC";
    font-weight: 400;
    color: #666666;
    line-height: 30px;
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
</style>
