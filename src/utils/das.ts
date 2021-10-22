import axios from "@/utils/axios.ts";

const inviteAccount = "dastools.bit";
const inviteCode = "Y9AZJV";
// import blake2b from 'blake2b';

// const RELEASE_NUMBER = 1503238553;
// export async function dasSearch(records : string[]) {
//   let ps : Promise[] = [];
//   for(let i = 0; i < records.length; i++) {
//     ps.push(axios.post('/', {
//       "jsonrpc" : "2.0",
//       "id" : i+"",
//       "method": "das_searchAccount",
//       "params": [
//           records[i]+".bit",
//       ],
//     }));
//   }

//   let checkReleaseStatus : boolean[] = dasReleaseStatus(records);

//   let results = await Promise.all(ps);
//   let rst = [];
//   for(let i=0; i < results.length; i++) {
//      if(checkReleaseStatus[i]) {
//         if(results[i].data.result.errno == 20007) {
//           rst.push({
//             name: records[i],
//             status: "can register",
//           });
//         } else {
//           rst.push({
//             name: records[i],
//             status: "already register",
//           });
//         }
//      } else {
//        rst.push({
//          name: records[i],
//          status: "not yet open",
//        });
//      }
//   }

//   return rst;
// }

export function getSaleInfo(account: string) : Promise {
	return axios.post('/bestdas/v1/sell/account/detail', {
	  account
	});
}

export function dasSearch(record : string, requestId : number) : Promise {
  let account : string = record + ".bit";
  let charArray = getCharArray(account);

  return new Promise((resolve) => {
    axios.post('/api/v1/das_accountSearch', {
      "jsonrpc" : "2.0",
      "id" : requestId,
      "method": "das_accountSearch",
      "params": [
          {
            "account": account,
            "account_char_str": charArray,
          }
      ],
    }).then((res) => {
       let obj = {
           name: account,
           status: -1,
           officialRegUrl: `https://app.da.systems/account/register/${account}?inviter=${inviteAccount}&channel=${inviteAccount}`,
           deNameRegUrl: `https://app.dename.com/register/${account}?inviter=${inviteCode}`,
		   bestDasUrl: `https://bestdas.com/account/${account}?inviter=${inviteAccount}`,
        };
       console.log(res);
       if(res?.data?.result?.errno == 0) {
         obj.status = res.data.result.data.status;
       } else {
         obj.status = -1;
       }

        resolve(obj);
    });

  });
}

export function getCharArray(account : string) {
  let len : number = account.length;
  let charArray = [];
  for(let i = 0; i < len; i++) {
      let c : string = account.charAt(i);
      if(isWord(c) || isDot(c)) {
        charArray.push({
          "char_set_name": 2,
          "char": c,
        });
      } else if(isNumber(c)) {
        charArray.push({
          "char_set_name": 1,
          "char": c,
        });
      } else {
        charArray.push({
          "char_set_name": 0,
          "char": c,
        });
      }

  }

  return charArray;
}

function isWord(c : string) : boolean {
  let p = /[a-z]/i;
  return p.test(c);
}
function isDot(c : string) : boolean {
  if(c === ".") {
    return true;
  } else {
    return false;
  }
}
function isNumber(c : string) : boolean {
  let p = /[0-9]/;
  return p.test(c);
}

// export function dasReleaseStatus(records : string[]) : boolean[] {
//   let rst : boolean[] = [];
//   for(let i =0; i < records.length; i++) {
//     const bytes = blake2b(32, undefined, undefined, '2021-07-22 12:00')
//       .update(new TextEncoder().encode(records[i])).digest();

//     let luckyNum = calLuckNumber(bytes);
//     if(luckyNum <= RELEASE_NUMBER) {
//       rst.push(true);
//     } else {
//       rst.push(false);
//     }
//   }

//   return rst;

// }

// function calLuckNumber(bytes : Uint8Array) : number {
//   const bb = bytes.subarray(0, 4);
//   var a = new Uint32Array(1);

//   a[0] = (bb[3] & 0xFF)<<24;

//   a[0] = a[0] | ((bb[2] & 0xFF) <<16);

//   a[0] = a[0] | ((bb[1] & 0xFF) <<8);

//   a[0] = a[0] | (bb[0] & 0xFF);

//   return a[0];
// }
