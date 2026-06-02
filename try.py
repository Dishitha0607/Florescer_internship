s = "dfa12321afd"
num = []

for char in  s:
  if char.isdigit():
    num.append(int(char))

res = sorted(set(num))

if len(res) < 2:
  return -1

return res[-2]