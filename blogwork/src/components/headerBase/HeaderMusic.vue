<template>
    <div class="music music_vue" @mouseover="mini=false">
        <Aplayer 
            :music="music" 
            :list="musicList"
            :float="true"
            listMaxHeight="164px"
            repeat="music"
            :listFolded="true"
            :mini="mini"
        />
    </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
import axios from "axios"
// 去除Aplayer自带的图标
Aplayer.disableVersionBadge = true

export default {
    name:"HeaderMusic",
    components:{Aplayer},
    data(){
        return {
            music:{
                title: '楼顶上的小斑鸠',
                artist: '队长',
                src: 'https://music.163.com/song/media/outer/url?id=1844449888.mp3',
                pic: '/vueImg/music_bg.webp'
            },
            musicList:[],
            mini:false
        }
    },
    methods:{
        async getMusic(){
            // 获取所有的榜单数据
            // let {data} = await axios.get("api/toplist/detail")
            // 获取对应歌单/榜单详情 
            let {data} = await axios.get("http://music.zzhitong.com/playlist/detail?id=3778678")
            // 处理数据
            this.handlerData(data.playlist.tracks)
           
            // let qwe = await axios.get("api/song/url?id=1901371647");
            // console.log(qwe);
        },
        // 获取音乐url地址
        async getMusicURL(url,index){
            let {data} = await axios.get(`http://music.zzhitong.com/song/url?id=${url}`)
            this.musicList[index].src = data.data[0].url
        },
        handlerData(value){
            this.musicList = value.map((item,index) => {
                this.getMusicURL(item.id,index)
                return {
                    title: item.name,
                    id: item.id,
                    artist: ' ',
                    src: "",
                    pic: item.al.picUrl
                }
            });
        }
    },
    created(){
        this.getMusic()
    },
    mounted() {
        setTimeout(() => {
            this.mini = true
        }, 5000);
    },
}
</script>

<style lang="less" scoped> 
    .music_vue{
        width: 200px;
        /deep/ .aplayer-pic{
            width: 40px;
            height: 40px;
            border-radius: 50% ;
            margin-top: 5px;
        }
        /deep/ .aplayer-body{
            height: 50px;
            box-shadow: 0 0 5px 1px #eee;
        }
        /deep/ .aplayer-float{
            margin: 0;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/ .aplayer-body .aplayer-info{
            padding: 0;
            height: 50px;
            margin-left: 5px;
        }
        /deep/ .aplayer-info .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/  .aplayer.aplayer-withlist .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/ .aplayer-music {
            margin-top: 10px;
        }
        /deep/ .aplayer-controller{
            margin-left: 5px;
        }

        /deep/ .aplayer-info .aplayer-volume-bar{
            height: 25px;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/  .aplayer-withlist{
            margin: 0;
        }
        /deep/ .aplayer-controller{
            width: 100px;
        }
        /deep/ .aplayer-pic .aplayer-play {
            width: 15px;
            height: 15px;
            bottom: 30%;
            right: -290%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-pic .aplayer-play .aplayer-icon-play{
            top: -2px;
            left: -1px;
            border: 0px solid #eee;
        }
        /deep/ .aplayer-pic .aplayer-pause{
            width: 15px;
            height: 15px;
            bottom: -7%;
            right: -328%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-icon-menu{
            margin-top: 2px;
        }  
    }

    .music_vue /deep/ .aplayer-icon-mode,
    .music_vue /deep/ .aplayer-time-inner{
        display: none;
    }
</style>