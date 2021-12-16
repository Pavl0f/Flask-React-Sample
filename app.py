import sys
from backend import server


server.run(debug=True, host="127.0.0.1", port=8000)

# # 開発環境
# if "--dev" in sys.argv:
#     server.run(debug=True, host="127.0.0.1", port=8000)
# elif "--test" in sys.argv:
#     pass