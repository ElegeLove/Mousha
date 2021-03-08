<template>
    <div class="container">
        <header class="header">
            <div class="navbar">
                <div
                    v-for="navItem in navbar"
                    :key="navItem.name"
                    class="navbar-item"
                >
                    <div>
                        <div
                            :class="[
                                navItem.name === navbarIndex
                                    ? 'navbar-item-active'
                                    : ''
                            ]"
                        >
                            {{ navItem.text }}
                        </div>
                        <div
                            class="line_box"
                            v-if="navItem.name === navbarIndex"
                        ></div>
                    </div>
                </div>
            </div>
        </header>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
        return {
            navbarIndex: "BasicInfo",
            navbar: [
                { text: "剧本基础信息", name: "BasicInfo" },
                { text: "流程设定", name: "ProcessSetting" },
                { text: "人物剧本", name: "CharacterPlay" },
                { text: "线索设置", name: "ClueSetting" },
                { text: "地图设置", name: "map" },
                { text: "问题库", name: "QuestionBank" },
                { text: "结局与真相", name: "EndTruth" }
            ],
            searchContent: "",
            keyWordList: [],
            courseURL: ""
        };
    },
    watch: {
        $route(to, from) {
            localStorage.setItem("selRouter", to.name);
            this.navbarIndex = to.name;
        }
    },
    created() {
        if (localStorage.getItem("selRouter")) {
            this.navbarIndex = localStorage.getItem("selRouter");
        }
    }
};
</script>

<style lang="scss">
.header {
    width: 100%;
    height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    .navbar {
        width: 1200px !important;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        div {
            position: relative;
            width: 120px;
            text-align: center;
            height: 30px;
            .navbar-item-active {
                color: #1994e9 !important;
            }
            .line_box {
                position: absolute;
                left: 45px;
                bottom: 0;
                width: 30px;
                height: 4px;
                background: #1a95ea;
                border-radius: 2px;
            }
        }
        .navbar-item {
            height: 100%;
            font-size: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 20px 10px;
        }
    }
}
.el-loading-mask {
    z-index: 9999 !important;
}
</style>

