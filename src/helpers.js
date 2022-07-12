export function formatSize(value){
    // console.log(value)
    const file_byte = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = value;
    var i=0;
    while(fSize>900){fSize/=1024;i++;}
    const file_size = (Math.round(fSize*100)/100)+' '+file_byte[i];
    return (file_size)
}

export function sliceString(value){
  const file_name_array = value.split(".");
  const file_name= file_name_array[0];
  return (file_name)
}

export function fileType(value){
  const file_name_array = value.split(".");
  const file_name= file_name_array[1];
  console.log(file_name);
  return (file_name)
}