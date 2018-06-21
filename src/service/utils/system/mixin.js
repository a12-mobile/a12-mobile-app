const mixin={
    mixin_ruixin:{
        beforeCreate(){

        },
        created(){
            // console.log("混入")
            // console.log(this.$ruixin)
        },
        mounted(){
            this.$ruixin.setWebViewTitle({title:this.$route.meta.title});
            setTimeout(()=>{
                this.$ruixin.supportAutorotate({});
            },200)
        },
        methods:{
            /**
             * 添加标题
             * @param {*} title 标题名称
             * @param {*} isAutorotate 是否支持横屏旋转，默认false
             */
            setWebViewTitle(title,isAutorotate=false){
                this.$ruixin.setWebViewTitle({title:title})
                if(isAutorotate){
                    this.supportAutorotate()
                }
            },

            /**
             * 设置屏幕可以横屏旋转
             */
            supportAutorotate(){
                // console.log('横屏')
                this.$ruixin.supportAutorotate({});
            }

        }
    }
}

export default mixin