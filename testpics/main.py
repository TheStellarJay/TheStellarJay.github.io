from PIL import Image, ImageDraw, ImageFont
import random
import yaml

eyes = ["amber", "blue", "brown", "green", "hazel", "red"]
hair = ["blonde", "ginger", "brown"]
pictures = {}

width = 512
height = 512

for i in range(0, 100):
	eyechoice = random.choice(eyes)
	hairchoice = random.choice(hair)
	message = f"{eyechoice} eyes\n{hairchoice} hair"
	img = Image.new('RGB', (width, height), color='black')
	imgDraw = ImageDraw.Draw(img)
	imgDraw.text((10, 10),
	             message,
	             fill=(0, 255, 0),
	             font=ImageFont.truetype(
	              "/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf",
	              size=64))
	img.save(f'{i}.png')
	pictures[i] = [eyechoice + "eyes", hairchoice + "hair"]

# save yaml
with open('pictures.yml', 'w') as f:
	yaml.dump(pictures, f)
