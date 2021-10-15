<template>
  <main class="main">


 <!--   <n-tabs default-value="search"
        size="large"
        justify-content="space-evenly"
        class="main-tabs"
        tab-style="font-weight: bold;"
        >


          <n-tab-pane name="search" tab="搜索">

          </n-tab-pane>
          <n-tab-pane name="my" tab="我的">

          </n-tab-pane>
    </n-tabs> -->

    <div class="logo">
      DAS.TOOLS
    </div>

    <div class="content">
    <!--  <n-grid cols="12" item-responsive responsive="screen">
         <n-gi span="1 m:4 l:5"></n-gi>
          <n-gi span="10 m:4 l:2">

          </n-gi>
         <n-gi span="1 m:4 l:5"></n-gi>
       </n-grid> -->
       <div class="col-1"></div>

       <div class="col-2">

             <div class="reg-box">
                 <n-input
                   round clearable
                   rows="5"
                   v-model:value="words"
                   type="textarea"
                   :placeholder="$t('index.reg_placeholder')"
                 />

                 <div class="btn-row">
                   <div class="his-btn-row">
                     <n-popover trigger="hover">
                         <template #trigger>
                           <n-button @click="saveSearchHis" style="margin-right: 10px;margin-bottom: 10px;" round type="default">
                              {{$t('index.save_history')}}
                           </n-button>
                         </template>
                         <span>{{$t('index.save_history_tips')}}</span>
                     </n-popover>


                     <n-popover trigger="hover">
                         <template #trigger>
                           <n-button @click="loadSearchHis" round type="default">
                              {{$t('index.load_history')}}
                           </n-button>
                         </template>
                         <span>{{$t('index.load_history_tips')}}</span>
                     </n-popover>


                   </div>

                    <n-button round
                      type="primary"

                      class="btn"
                      icon-placement="left"
                      @click="searchAccount"
                      >
                      <template #icon>
                              <n-icon size="20">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M8.5 3a5.5 5.5 0 0 1 4.383 8.823l4.147 4.147a.75.75 0 0 1-.976 1.133l-.084-.073l-4.147-4.147A5.5 5.5 0 1 1 8.5 3zm0 1.5a4 4 0 1 0 0 8a4 4 0 0 0 0-8z" fill="currentColor"></path></g></svg>
                              </n-icon>
                      </template>
                      {{$t('index.search')}}
                    </n-button>
                 </div>


                <n-empty style="margin-bottom: 30px;" v-show="results.length == 0" :description="$t('index.empty_tips')">
                     <!-- <template #extra>
                       <n-button size="small">看看别的</n-button>
                     </template> -->
                </n-empty>

                 <div class="list" v-show="results.length !== 0">
                   <div class="list-top">
                     <n-button
                        icon-placement="left"
                        @click="deleteUnusable"
                        >
                        <template #icon>
                                <n-icon size="19">
                                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5zM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25z" fill="currentColor"></path></g></svg>
                                </n-icon>
                        </template>
                        {{$t('index.delete_unable_account')}}
                     </n-button>
                   </div>

                   <div class="list-item" v-for="item in results" :key="item.name">
                      <div @click="openUrl('https://'+item.name+'.cc')" class="account-name">{{item.name}}</div>


                      <div v-if="item.status === 0" class="reg-btn-group">
                        <n-popover trigger="hover">
                            <template #trigger>
                              <n-button @click="openUrl(item.deNameRegUrl)" style="margin-right: 10px;" round type="primary">
                                 {{$t('index.dename_reg')}}
                              </n-button>
                            </template>
                            <span>{{$t('index.dename_reg_tips')}}</span>
                        </n-popover>


                        <n-popover trigger="hover">
                            <template #trigger>
                              <n-button @click="openUrl(item.officialRegUrl)" round type="info">
                                 {{$t('index.official_reg')}}
                              </n-button>
                            </template>
                            <span>{{$t('index.official_reg_tips')}}</span>
                        </n-popover>
                      </div>

                      <div v-else-if="item.status === 6">
                          <n-tag :color="{textColor: '#b8b8b8'}" size="large" :disabled="disabled"> {{$t('index.already_reg')}} </n-tag>
                      </div>
                      <div v-else>
                          <n-tag :color="{textColor: '#b8b8b8'}" size="large" :disabled="disabled"> {{$t('index.not_open')}} </n-tag>
                      </div>

                   </div>
                 </div>


             </div>


             <div class="sponsor">
                  <div style="font-size: 20px; font-weight: bold;">{{$t('index.sponsor')}}DAS.TOOLS</div>
                  <div style="font-size: 20px; ">dastools.bit</div>
                  <div class="address">
                    <div class="address-one">
                      <div style="margin-right: 3px;" >CKB: ckb1qyqy7u0zs88nrdu82ezndrtzwf5z5uknj7wsma2zcr</div>
                      <n-icon @click="copyThat('ckb1qyqy7u0zs88nrdu82ezndrtzwf5z5uknj7wsma2zcr')">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"></path></svg>
                      </n-icon>
                    </div>

                     <div class="address-two">
                       <div style="margin-right: 3px;">ETH: 0xFC948c53ED97fd5e5Ac3F6459318e3D58D8dE0C9</div>
                       <n-icon @click="copyThat('0xFC948c53ED97fd5e5Ac3F6459318e3D58D8dE0C9')">
                         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" fill="currentColor"></path></svg>
                       </n-icon>
                     </div>

                  </div>

             </div>

             <div class="sponsor">
               <div>
                 Accelerated & hosted by <div @click="openUrl('https://www.4everland.org')" style="display: inline-block; cursor: pointer; color: yellow">4EVERLAND</div>
               </div>
               <n-image
                   @click="openUrl('https://www.4everland.org')"
                   width="280"
                   height="50"
                   src="/4everland.svg"
                 />
             </div>


       </div>

       <div class="col-3"></div>


    </div>

   <!-- <div class="bottom">
      <div class="left">
        <Nav />
      </div>

      <div class="right">
        <div class="content">
          <router-view />
        </div>
      </div>
    </div> -->


  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {dasSearch} from '@/utils/das.ts';
import { useMessage } from 'naive-ui';
import { setLanguage } from '@/i18n';


export default defineComponent({
  name: 'Main',

  setup() {


      const message = useMessage()
      window.$message = message;
  },

  data() {
    return {
      words: undefined,
      results: [],
    };
  },
  created() {
    var lan = (navigator.language || navigator.browserLanguage).toLowerCase();
    	if( lan === 'zh-cn' ) {
        console.log(this.$i18n);
    		setLanguage('zh-cn');
    	} else {
    		setLanguage('en');
    	}
    	console.log("lan: ", lan);
  },
  methods: {
       copyThat(data){
          let oInput= document.createElement('input');
          oInput.value = data;
          document.body.appendChild(oInput);
          oInput.select(); // 选择对象;
          console.log(oInput.value);
          document.execCommand("Copy"); // 执行浏览器复制命令
           window.$message.success(this.$t('index.copy_success'));
          oInput.remove();
      },
      searchAccount() {
        let sewords = this.words.trim();
        if(sewords && sewords != "") {

          window.$message.loading(this.$t('index.loading'));
          let wordArray : string[] = this.splitWords(sewords);
          console.log(wordArray);

          this.results = [];
          for(let i = 0; i < wordArray.length; i++) {
            if(wordArray[i] && wordArray[i] != "") {
              dasSearch(wordArray[i], i).then((obj) => {
                this.results.push(obj);
              });
            }
          }

          //this.removeMessage();
        } else {
          this.results = [];
        }

      },
      splitWords(words : string) : string[] {
        return words.toLowerCase().split(/[\r\n\s+]/g);
      },
      openUrl(url : string) : void {
        window.open(url, "_blank");
      },
      deleteUnusable() : void {
        let newResults = [];
        for(let i = 0; i < this.results.length; i++) {
          let status : number = this.results[i].status;

          if(status === 0) {
            newResults.push(this.results[i]);
          }
        }

        this.results = newResults;
      },
      saveSearchHis() : void {
        if(this.words && this.words.trim().length !== 0) {
          localStorage.searchValue = this.words;
          window.$message.success(this.$t('index.save_success'));
        }
      },
      loadSearchHis() : void {
        if(localStorage.searchValue) {
          this.words = localStorage.searchValue;
          window.$message.success(this.$t('index.load_success'));
        } else {
          window.$message.info(this.$t('index.no_data'));
        }

      },

  },
})
</script>

<style lang="scss" scoped>
.main {
  //background-color: green;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  font-size: 30px;
  color: #FFFFFF;
  font-weight: bold;
}


.content {
  margin-top: 15px;
  display: flex;
  // flex-direction: column;
  // justify-content: center;
}

.main-tabs {
  background-color: white;
  height: 45px;
}

.col-1 {
  width: 10%;
}

.col-2 {
  width: 80%;
}

.col-3 {
  width: 10%;
}

.reg-box {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  padding-bottom: 5px;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  //width: 550px;
}

.sponsor {
  margin-top: 20px;
  // padding-left: 25px;
  // padding-right: 25px;
  padding-top: 25px;
  padding-bottom: 5px;
  border-radius: 10px;
  //background-color: green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  font-size: 16px;
  word-wrap: break-word;
  word-break: break-all;

}

.address {
  display: flex;
  justify-content: space-between;
  word-wrap: break-word;
  word-break: break-all;
}

.address-one {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.address-two {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-row {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
}

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.list-top {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #efefef;
  word-wrap: break-word;
  word-break: break-all;
}

.list-item:hover {
  background-color: #efefef;
}

.account-name {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00ab00;
  font-weight: bold;
  font-size: 17px;
  margin-right: 10px;
}

.account-name:hover {
  text-decoration: underline;
  cursor: default;
  color: gray;
}

@media all and (max-width: 960px) {
  .col-1 {
    width: 5%;
  }

  .col-2 {
    width: 90%;
  }

  .col-3 {
    width: 5%;
  }

  .reg-box {
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    //width: 550px;
  }

  .sponsor {
    margin-top: 20px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .address {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    word-break: break-all;
  }

  .address-one {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
  }

  .address-two {
    display: flex;
    justify-content: center;
  }

  .his-btn-row {
    display: flex;
    flex-direction: column;
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 5px;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: #efefef;
    word-wrap: break-word;
    word-break: break-all;
  }


}





.btn {
  max-width: 100px;
}

.reg-btn-group {
 display: flex;
 flex-wrap: nowrap;
}

</style>
