import dayjs from "dayjs"

const formatTime = {
  getTime:(date)=>{
    return dayjs(date).format('YYYY/MM/DD');
  }
}

export default formatTime