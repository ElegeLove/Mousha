<template>
    <div id="processSetting">
        <div class="processSetting">
            <div>
                <div
                    class="set_item"
                    v-for="(item, index) in setItemList"
                    :key="index"
                >
                    <div
                        class="set_item_title"
                    >
                        {{ item.script_node_name }}
                    </div>
                    <div class="set_item_icon">
                        <img
                            class="icon_down"
                            :src="require('assets/img/icon_down.png')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_nex" @click="clickNext">编辑</div>
            </div>
        </div>
    </div>
</template>

<script>
import { Message } from "element-ui";
export default {
    data() {
        return {
            setItemList: [
                {
                    script_node_name: "背景故事",
                    order_num: "0",
                    describe: "",
                    button_name: "",
                    node_type: "1",
                    min_experience: "",
                    experience: "",
                    status: true
                },
                {
                    script_node_name: "自我介绍",
                    order_num: "1",
                    describe: "",
                    button_name: "",
                    node_type: "2",
                    min_experience: "",
                    experience: "",
                    status: true
                },
                {
                    script_node_name: "结束结算",
                    order_num: "2",
                    describe: "",
                    button_name: "",
                    node_type: "6",
                    min_experience: "",
                    experience: "",
                    status: true
                }
            ],
            allData: {},
            itemTypeVal: "",
            setItemLength: "",
            // 弹出框
            dialogVisible: false,
            modeTypeList: [
                //节点预算
                {
                    name: "阅读剧本",
                    num: "3"
                },
                {
                    name: "搜证",
                    num: "4"
                },
                {
                    name: "投票",
                    num: "5"
                }
            ],
            modeTypeShow: false,
            modeTypeObj: {
                modeTypeVal: "3", //节点类型
                modeName: "", //节点名称
                modeExplain: "", //节点说明
                btnName: "", //按钮名称
                experience: "", //经验
                score: "" //得分
            },
            // 人物剧本
            manDrama: [
                {
                    name: "人物1姓名", //人物姓名
                    nameVal: "", //人物姓名
                    introduce: "人物1介绍", //人物介绍
                    introduceVal: "", //人物介绍
                    head: "人物1头像", //人物头像
                    headVal: "", //人物头像
                    childVal: "人物1剧本", //人物剧本
                    child: [
                        //人物剧本
                        {
                            childName: "", //章节名称
                            childMode: "", //流程节点
                            childMain: "" //章节内容
                        }
                    ]
                }
            ],
            mapSetVal: {
                mapPath: "", //图片
                mapNode: "" //流程节点
            },
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                procedureNode: "",
                chapterMain: ""
            },
            dataIndex: 0,
            addIndex: 0,
            addStatus: false
        };
    },
    created() {
        this.allData = JSON.parse(localStorage.getItem("data"));
        if (this.allData.setArr) {
            this.setItemList = this.allData.setArr;
        }
        this.setItemLength = this.setItemList.length - 1;
    },
    methods: {
        // 下一步
        clickNext() {
            // this.allData.setArr = this.setItemList;
            localStorage.setItem('selRouter','ProcessSettingUp')
            // localStorage.setItem("data", JSON.stringify(this.allData));
            this.$router.push({
                path: "/updataScript/ProcessSettingUp",
                query: {
                    id: this.allData.basicInfoData.id
                }
            });
        }
    }
};
</script>

<style scoped>
#processSetting{
    padding: 20px;
    box-sizing: border-box;
}
.processSetting {
    width: 100%;
    padding: 10px 20px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
}
.set_item {
    text-align: center;
}

.set_item_box {
    width: 312px;
    height: 60px;
}

.set_item_title {
    width: 312px;
    height: 60px;
    border: 1px solid rgba(26, 149, 234, 1);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(26, 149, 234, 1);
    /* cursor: pointer; */
}

.set_item_titHover {
    width: 312px;
    height: 60px;
    border-radius: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    background: rgba(26, 149, 234, 1);
    color: rgba(255, 255, 255, 1) !important;
}
.cordiv {
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1) !important;
}
.set_item_titHover > div {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 1) !important;
}

.set_item_titHover > div > img {
    width: 17px;
    height: 17px;
    margin-right: 8px;
}

.set_item_icon {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.icon_down {
    width: 9px;
    height: 36px;
    margin: 4px 0;
}

.icon_add {
    width: 26px;
    height: 26px;
    margin-left: 18px;
    position: absolute;
    left: 166px;
    top: 10px;
    cursor: pointer;
}

.set_item:last-child img {
    display: none;
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

.tabMain_top_item {
    margin: 0 45px 20px 0;
    /* padding-right: 126px; */
    box-sizing: border-box;
}
.tabMain_top_item_inp {
    width: 100%;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 10px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
}
.tabMain_top_item_sel {
    padding: 0 0.3rem 0 0.2rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
</style>