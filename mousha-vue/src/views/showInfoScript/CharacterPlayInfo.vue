<template>
    <div class="characterPlay">
        <div
            class="characterPlay_main"
            v-for="(item, ix) in manDrama"
            :key="ix"
        >
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}姓名</div>
                <div class="tabMain_top_item_inp">{{ item.name }}</div>
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}介绍</div>
                <div class="tabMain_top_item_inp">{{ item.describe }}</div>
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}头像</div>
                <div class="tabMain_top_item_down_sel">{{ item.head_name }}</div>
            </div>
            <div class="tabMain_top_item">
                <div class="tabMain_top_item_title">人物{{ ix + 1 }}剧本</div>
                <div class="characterPlay_box">
                    <div
                        class="characterPlay_item"
                        v-for="(itemChild, ix1) in item.child"
                        :key="ix1"
                    >
                        <input
                            v-model="itemChild.childName"
                            readonly="readonly"
                            type="text"
                            name=""
                            id=""
                        />
                        <img
                            @click="updateMode(ix, ix1)"
                            :src="require('assets/img/icon_update1.png')"
                            alt=""
                        />
                    </div>
                    <!-- <div class="characterPlay_btn" @click="addMode(ix)">
                        新增
                    </div> -->
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="footer_box">
                <div class="footer_nex" @click="clickNext">编辑</div>
            </div>
        </div>
        <!-- 人物剧本新增 -->
        <el-dialog :visible.sync="manDramaShow" width="50%">
            <div class="popBox">
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">章节名称</div>
                    <div class="tabMain_top_item_inp">
                        {{ manDramaAdd.chapterName }}
                    </div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">流程节点</div>
                    <div class="tabMain_top_item_down_sel">
                        {{ manDramaAdd.procedureNode }}
                    </div>
                </div>
                <div class="tabMain_top_item">
                    <div class="tabMain_top_item_title">章节内容</div>
                    <div class="tabMain_top_item_inp chapterMain_text">
                        {{ manDramaAdd.chapterMain }}
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="manDramaShow = false"
                    >关闭</el-button
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
            // 人物剧本
            manDrama: [
                {
                    name: "", //人物姓名
                    describe: "", //人物介绍
                    head_id: "", //人物头像
                    head_name: "", //人物头像
                    end_name: "", //	结局名称
                    end_story: "", //	结局内容
                    child: []
                }
            ],
            manDramaIndex: -1, //人物剧本索引
            manDramaChildIndex: -1, //人物剧本子索引
            manDramaShow: false, //人物剧本新增弹窗
            manHead: [],
            value: "",
            manDramaAdd: {
                //新增编辑弹窗
                chapterName: "",
                procedureNode: "",
                chapterMain: ""
            },
            isAddMode: true,
            processNode: [],
            isSure: false
        };
    },
    created() {
        this.getHeadList();
        this.allData = JSON.parse(localStorage.getItem("data"));
        this.processNode = this.allData.setArr;
        if (this.allData.manDrama) {
            this.manDrama = this.allData.manDrama;
            if (
                this.allData.manDrama.length >
                parseInt(this.allData.basicInfoData.playsNum)
            ) {
                let arr = [];
                for (
                    let i = 0;
                    i < parseInt(this.allData.basicInfoData.playsNum);
                    i++
                ) {
                    let obj = {
                        name: "", //人物姓名
                        describe: "", //人物介绍
                        head_id: "", //人物头像
                        end_name: "", //	结局名称
                        end_story: "", //	结局内容
                        child: []
                    };
                    arr.push(obj);
                }
                this.manDrama = arr;
            } else {
                let arr = [];
                this.manDrama = this.allData.manDrama;
                for (
                    let i = 0;
                    i <
                    parseInt(this.allData.basicInfoData.playsNum) -
                        this.allData.manDrama.length;
                    i++
                ) {
                    let obj = {
                        name: "", //人物姓名
                        describe: "", //人物介绍
                        head_id: "", //人物头像
                        end_name: "", //	结局名称
                        end_story: "", //	结局内容
                        child: []
                    };
                    arr.push(obj);
                }
                this.manDrama.concat(arr);
            }
        } else {
            let arr = [];
            for (
                let i = 0;
                i < parseInt(this.allData.basicInfoData.playsNum);
                i++
            ) {
                let obj = {
                    name: "", //人物姓名
                    describe: "", //人物介绍
                    head_id: "", //人物头像
                    end_name: "", //	结局名称
                    end_story: "", //	结局内容
                    child: []
                };
                arr.push(obj);
            }
            this.manDrama = arr;
        }
    },
    methods: {
        getHeadList() {
            let that = this;
            let data = {
                url: "/current/script/role_head_list",
                method: "post",
                data: {}
            };
            this.$apiAxiox(data).then(res => {
                if (res.data.code == 1) {
                    that.manHead = res.data.data.list;
                    console.log(that.manHead);
                } else {
                    that.$message.error(res.data.msg);
                }
            });
        },
        openMode() {
            this.modeTypeShow = !this.modeTypeShow;
        },
        //下拉框选择
        getMode(index, item) {
            this.modeTypeObj.modeTypeVal = item.name;
            this.modeTypeShow = false;
        },
        // 新增人物剧本
        addMode(i) {
            this.manDramaIndex = i;
            this.manDramaAdd.chapterName = "";
            this.manDramaAdd.procedureNode = "";
            this.manDramaAdd.chapterMain = "";
            this.manDramaShow = true;
            this.isAddMode = true;
        },
        // 修改人物剧本
        updateMode(i, i1) {
            this.manDramaIndex = i;
            this.manDramaChildIndex = i1;
            this.manDramaAdd.chapterName = this.manDrama[i].child[i1].childName;
            this.manDramaAdd.procedureNode = this.manDrama[i].child[
                i1
            ].childModeName;
            this.manDramaAdd.chapterMain = this.manDrama[i].child[i1].childMain;
            this.manDramaShow = true;
            this.isAddMode = false;
        },
        // 下一步
        clickNext() {
            localStorage.setItem('selRouter','CharacterPlayUp')
            this.$router.push({
                path: "/updataScript/CharacterPlayUp",
                query: {
                    id: this.allData.basicInfoData.id
                }
            });
            // let that = this;
            // this.manDrama.some(item => {
            //     if (item.name == "") {
            //         Message.error("请输入人物姓名");
            //         that.isSure = false;
            //         return true;
            //     } else if (item.describe == "") {
            //         Message.error("请输入人物介绍");
            //         that.isSure = false;
            //         return true;
            //     } else if (item.head_id == "") {
            //         Message.error("请选择人物头像");
            //         that.isSure = false;
            //         return true;
            //     } else {
            //         that.isSure = true;
            //     }
            // });
            // if (that.isSure) {
            //     this.allData.manDrama = this.manDrama;
            //     localStorage.setItem("data", JSON.stringify(this.allData));
            //     this.$router.push({
            //         path: "ClueSetting"
            //         // query: {
            //         //     type: i
            //         // }
            //     });
            // }
        }
    }
};
</script>

<style scoped>
.characterPlay {
    padding: 20px;
    box-sizing: border-box;
}
.characterPlay_main {
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
}
.tabMain_top_item_inp {
    width: 100%;
    min-height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.characterPlay_main .tabMain_top_item_inp,
.characterPlay_main .tabMain_top_item_inp input {
    width: 100%;
    /* height: 50px; */
    padding: 0 20px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    outline-style: none;
}
.tabMain_top_item {
    margin: 0 20px 20px;
    /* padding-right: 126px; */
    box-sizing: border-box;
}
.tabMain_top_item_down_sel {
    width: 100%;
    padding: 0 20px 0 20px;
    margin-top: 15px;
    min-height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
}

.tabMain_top_item_down_sel input {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    margin-top: 14px;
    background: rgba(245, 245, 245, 1);
    border-radius: 4px;
    border: none;
    outline: none;
    background: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
    cursor: pointer;
}

.characterPlay_box {
    width: 100%;
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.characterPlay_item {
    width: 260px;
    height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    background: rgba(245, 245, 245, 1);
    border: 1px solid rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin: 0 34px 20px 0;
}

.characterPlay_item input {
    width: 100%;
    margin-right: 10px;
    border: none;
    outline: none;
    background: rgba(245, 245, 245, 1);
    font-size: 16px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
}

.characterPlay_item img {
    width: 23px;
    height: 25px;
    cursor: pointer;
}

.characterPlay_btn {
    width: 100px;
    height: 50px;
    margin-bottom: 20px;
    background: rgba(26, 149, 234, 1);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "Microsoft YaHei";
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
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
    overflow-y: scroll;
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
</style>