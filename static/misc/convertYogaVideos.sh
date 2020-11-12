mkdir -p output
for i in *.mp4;
  do name=`echo "$i" | cut -d'.' -f1`
  echo "$name"
  ffmpeg -y -i "$i" -vf "crop=608:1072:656:4" -an "cropped_${name}.mp4"
  ffmpeg -y -i "cropped_${name}.mp4" -vf scale="384:216" -an -movflags +faststart -brand mp42  "output/${name}.mp4"
  ffmpeg -y -i "cropped_${name}.mp4" -vf scale="384:216" -an -c:v libvpx-vp9 "output/${name}.webm"
  rm "cropped_${name}.mp4"
done