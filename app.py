import sys
from backend import server

if "--dev" in sys.argv:
    server.run(debug=True, host="127.0.0.1", port=8000)
elif "--prod" in sys.argv:
    server.run(debug=False, host="0.0.0.0", port=80)
