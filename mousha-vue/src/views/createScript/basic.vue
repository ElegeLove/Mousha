<template>
	<div class="container">
		<el-row :gutter="45">
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="40">
				<div class="basic-item">
					<p class="basic-item-label">剧本名称</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">剧本人数</p>
					<el-input placeholder="请输入内容" type="number" @input="value=value.replace(/[^\d]/g,'')"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">作者</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">时长</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">难度</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">字数</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">剧本标签</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
			<el-col :xs="4" :md="4" :lg="4" :sm="3" :span="10">
				<div class="basic-item">
					<p class="basic-item-label">密谈室数量</p>
					<el-input placeholder="请输入内容"></el-input>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		flex: 1;
		padding-right: 10%;
		padding-left: 40px;
		padding-top: 38px;
	}
	.basic-item{
		padding-bottom: 20px;
		.basic-item-label{
			font-size: 16px;
			margin-bottom: 10px;
		}
	}
</style>
