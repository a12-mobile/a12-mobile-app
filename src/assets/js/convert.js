import {getCurrentTime} from './date'

export function convertJsonToBean(data) {
    var time = getCurrentTime();
    var item = {
      "time": time,
      "jingshen": data["8404"]["1526031567000"],
      "zuantouweizhi": data["8008"]["1526031837000"],
      "chidaojingshen": data["8405"]["1526031567000"],
      "chidaoshijian": data["8406"]["1526031567000"],
      "dagougaodu": data["8408"]["1526031567000"],
      "dagoufuhe": data["8490"]["1526031567000"],
      "zuanya": data["8491"]["1526031567000"],
      "zhuanpanzhuansu": data["8492"]["1526031567000"],
      "niuju": data["8493"]["1526031567000"],
      "liguanyali": data["8494"]["1526031567000"],
      "taoguanyali": data["8010"]["1526031837000"],
      "zuanshi": data["8495"]["1526031567000"]
    }
    return item;
  }