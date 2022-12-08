curl 'https://adventofcode.com/2022/leaderboard/private/view/1056653.json' \
  -H 'cookie: session=53616c7465645f5ff15c1f893171afe3c69ec05c6d8108f87041c68e87176f60d917772b18ca9ea8e78267cb743af7b59a65dd252c9ea4fa7ec862c4c261a96b' \
  --compressed > leaderboard2022.json

node leaderboard.js
