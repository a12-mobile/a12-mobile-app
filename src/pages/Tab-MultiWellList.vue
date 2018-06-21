<template>
  <div style="margin-top:50px;">
    <button class="btn btn-danger" @click="clean">清空</button>
    <button class="btn btn-danger" @click="bubbleSort">冒泡排序</button>
    <button class="btn btn-danger" @click="selectSort">选择排序</button>
    <button class="btn btn-danger" @click="insertSort">插入排序</button>
    <button class="btn btn-danger" @click="insertSortPro">二分插入排序</button>
    <button class="btn btn-danger" @click="shellSort">希尔排序</button>
    <button class="btn btn-danger" @click="mergeSortMain">归并排序</button>
    <p>排序前：3,44,38,5,47,15,36,26,27,2,46,4,19,50,48</p>
    <p>排序后：{{arr.toString()}}</p>
  </div>


</template>

<script>
export default {
  name: 'page-navbar',
  create(){

  },

  data() {
    return {
      baseDate:[3,44,38,5,47,15,36,26,27,2,46,4,19,50,48],
      arr:[],
    };
  },
  methods:{
    clean(){
      this.arr=[]
    },
    sort(){
      //冒泡排序
      this.sortedArr=this.bubbleSort(this.arr)
    },
    /**
     * 冒泡排序
     * 平均耗时  O(n^2)
     * 稳定排序   傻瓜式排序
     */
    bubbleSort(){
      let arr=this.baseDate
      console.time("冒泡排序")
      for(let i=0;i<arr.length;i++){
        let flag=false;
        for(let j=arr.length-1;j>i;j--){
          if(arr[j]<arr[j-1]){
            //交换    稳定的
            let temp=arr[j]
            arr[j]=arr[j-1]
            arr[j-1]=temp
            flag=true
          }
        }
        if(!flag){
          //已经排好了
          break
        }
      }
      console.timeEnd("冒泡排序")
      this.arr=arr
    },
    /**
     * 选择排序
     * 时间复杂度上最稳定的排序算法之一    无论怎么排用时都是O(n^2)
     * 
     * @example  规模越小越好   唯一优势：不占用额外内存空间
     */
    selectSort(){
      let arr=this.baseDate
      let minIndex,temp
      console.time("选择排序")
      for(let i=0;i<arr.length-1;i++){
        minIndex=i
        for(let j=i+1;j<arr.length;j++){
          //寻找最小的值得索引  并保存
          if(arr[j]<arr[minIndex]){
            minIndex=j
          }
        }
        temp=arr[i]
        arr[i]=arr[minIndex]
        arr[minIndex]=temp
      }
      console.timeEnd("选择排序")
      this.arr=arr
    },
    
    /**
     * 插入排序
     * 
     */
    insertSort(){
      let arr=this.baseDate
      let j,current
      console.time("插入排序")
      for(let i=1;i<arr.length;i++){
        j=i-1
        current=arr[i]
        while(j>=0&&arr[j]>current){
          //前面有比自己大得  得换换
          arr[j+1]=arr[j]
          j--
        }
        arr[j+1]=current
      }
      console.timeEnd("插入排序")
      this.arr=arr
    },
    /**
     * 二分插入排序
     * 插入排序升级版
     */
    insertSortPro(){
      let arr=this.baseDate
      let left,right,middle,current
      console.time("二分插入排序")
      for(let i=1;i<arr.length;i++){
        current=arr[i]
        left=0
        right=i-1
        while(left<=right){
          middle=parseInt((left+right)/2)
          if(current<arr[middle]){
            right=middle-1
          }else{
            left=middle+1
          }
        }
        for(let j=i-1;j>=left;j--){
          arr[j+1]=arr[j]
        }
        arr[left]=current
      }
      console.timeEnd("二分插入排序")
      this.arr=arr
    },
    
    shellSort(){
      let arr=this.baseDate
      let len=arr.length,
      temp,gap=1
      console.time("希尔排序")
      while(gap<len/3){
        gap=gap*3+1
      }
      for(gap;gap>0;gap=Math.floor(gap/3)){
        for(let i=gap;i<arr.length;i++){
          temp=arr[i]
          for(var j=i-gap;j>=0&&arr[j]>temp;j-=gap){
            arr[j+gap]=arr[j]
          }
          arr[j+gap]=temp
        }
      }
      console.timeEnd("希尔排序")
      this.arr=arr
    },

    mergeSortMain(){
      console.time("归并排序")
      this.arr=this.mergeSort(this.baseDate)
      console.timeEnd("归并排序")
    },
    
    /**
     * 归并排序
     * 
     * js对于递归没有优化  采用递归函数bu'jin没有速度上的优势，还有可能造成程序运行失败
     * 
     * @example 时间复杂度始终为  O(n log n)  代价是需要额外得内存空间
     */
    mergeSort(arr){
      let len=arr.length
      if(len<2){
        return arr
      }
      let middle=Math.floor(len/2),
          left=arr.slice(0,middle),
          right=arr.slice(middle)
      return this.merge(this.mergeSort(left),this.mergeSort(right))
    },
    merge(left,right){
      let result=[]
      while(left.length>0&&right.length>0){
        if(left[0]<=right[0]){
          result.push(left.shift())
        }else{
          result.push(right.shift())
        }
      }
      while(left.length){
        result.push(left.shift())
      }
      while(right.length){
        result.push(right.shift())
      }
      return result
    },
    baseSort(){
      let arr=this.baseDate
      console.time("排序")
      console.timeEnd("排序")
      this.arr=arr
    },











  }
};
</script>
