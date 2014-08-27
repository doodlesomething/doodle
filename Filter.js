	/*
	author:MyDoodle
	date:2013/8/16
	version:1.0
	*/


	//反色滤镜
	function negativeFilter(imageData) {
		var data = imageData.data;
		for (var i = 0; i < data.length - 4; i += 4) {
			data[i] = 255 - data[i];
			data[i + 1] = 255 - data[i + 1];
			data[i + 2] = 255 - data[i + 2];
		}
		return imageData;
	}

	//黑白滤镜
	/**
	 * [BAW_Filter description]
	 * @param {[type]} imageData [description]
	 */
	function BAW_Filter(imageData) {
		var data = imageData.data;
		for (var i = 0; i < data.length - 4; i += 4) {
			var tmp = (data[i] + data[i + 1] + data[i + 2]) / 3;

			data[i] = tmp;
			data[i + 1] = tmp;
			data[i + 2] = tmp;
		}
		return imageData;

	}


	//浮雕滤镜
	function embossFilter(imageData) {
		var data = imageData.data,
			width = imageData.width;
		for (var i = 0; i < data.length; i++) { //遍历各像素分量

			if (i <= data.length - 4 * width) {

				//当右边已经没有时						
				if ((i + 4) % (width * 4) == 0) {
					data[i] = data[i - 4];
					data[i + 1] = data[i - 3];
					data[i + 2] = data[i - 2];
					data[i + 3] = data[i - 1];
					i += 4;
				} else {
					data[i] = 128 + data[i] - data[i + 4]; //核心代码
				}
			} else {
				//当没有下一行时
				if ((i + 1) % 4 !== 0) {
					data[i] = data[i - width * 4];
				}
			}

		}
		return imageData;

	}


	//墨镜滤镜:	unknow
	function sunglassFilter(imageData) {
		var data = imageData.data,
		width = imageData.width;
		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 != 0) {
				if ((i + 4) % (width * 4) == 0) {
					data[i] = data[i - 4];
					data[i + 1] = data[i - 3];
					data[i + 2] = data[i - 2];
					data[i + 3] = data[i - 1];
					i += 4;
				} else {
					data[i] = 2 * data[i] - data[i + 4] - 0.5 * data[i + 4];
				}
			}
		}

		return imageData;
	}


	//灰度效果：(去色)
	function grayFilter(imageData) {
		var data = imageData.data,
			width = imageData.width;
		for (var i = 0; i < data.length - 4; i += 4) { //遍历各像素分量	.299 * r + .587 * g + .114 * b;
			var tmp = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.144;

			data[i] = data[i + 1] = data[i + 2] = tmp;
		}
		return imageData;
	}

	//怀旧滤镜：
	function reminiscenceFilter(imageData) {
		var data = imageData.data;
		for (i = 0; i < data.length - 4; i += 4) { 
			//遍历各像素分量	
			var dr = .393 * data[i] + .769 * data[i + 1] + .189 * data[i + 2];
			var dg = .349 * data[i] + .686 * data[i + 1] + .168 * data[i + 2];
			var db = .272 * data[i] + .534 * data[i + 1] + .131 * data[i + 2];

			var scale = Math.random() * 0.5 + 0.5;

			data[i] = scale * dr + (1 - scale) * data[i];
			scale = Math.random() * 0.5 + 0.5;
			data[i + 1] = scale * dg + (1 - scale) * data[i + 1];
			scale = Math.random() * 0.5 + 0.5;
			data[i + 2] = scale * db + (1 - scale) * data[i + 2];
		}
		return imageData;

	}


	//连环画滤镜：
	function comicFilter(imageData) {
		var data = imageData.data;
		for (i = 0; i < data.length - 4; i += 4) { //遍历各像素分量	
			data[i] = Math.abs(data[i + 1] - data[i + 2] + data[i + 1] + data[i]) * data[i] / 256;
			data[i + 1] = Math.abs(data[i + 2] - data[i + 1] + data[i + 2] + data[i]) * data[i] / 256;
			data[i + 2] = Math.abs(data[i + 2] - data[i + 1] + data[i + 2] + data[i]) * data[i + 1] / 256;
		}

		return imageData;
	}

	//熔铸滤镜：
	function castingFilter(imageData) {
		var data = imageData.data;
		for (i = 0; i < data.length - 4; i += 4) {
			data[i] = data[i] * 128 / (data[i + 1] + data[i + 2] + 1);
			data[i + 1] = data[i + 1] * 128 / (data[i] + data[i + 2] + 1);
			data[i + 2] = data[i + 2] * 128 / (data[i] + data[i + 1] + 1);
		}

		return imageData;
	}


	//冰冻滤镜：
	function freezeFilter(imageData) {
		var data = imageData.data;
		for (i = 0; i < data.length - 4; i += 4) {
			data[i] = (data[i] - data[i + 1] - data[i + 2]) * 3 / 2;
			data[i + 1] = (data[i + 1] - data[i] - data[i + 2]) * 3 / 2;
			data[i + 2] = (data[i + 2] - data[i] - data[i + 1]) * 3 / 2;
		}
		return imageData;
	}


	//毛玻璃（扩散）滤镜：
	function spreadFilter(imageData) {
		var data = imageData.data;
		for (i = 0; i < data.length - 4; i += 4) {
			rand = Math.floor(Math.random() * 10) % 3; //这里的设置可以根据情况而定
			data[i] = data[i + rand];
			data[i + 1] = data[i + 1 + rand];
			data[i + 2] = data[i + 2 + rand];
		}
		return imageData;
	}


	//高斯模糊 

	function GaussianBlur(radius, sigma, imageData) {
		var data = imageData.data,
			width = imageData.width,
			height = imageData.height;

		var gaussMatrix = [],
			gaussSum = 0,
			x, y,
			r, g, b, a,
			i, j, k, len;


		radius = Math.floor(radius) || 3;
		sigma = sigma || radius / 3;

		a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
		b = -1 / (2 * sigma * sigma);
		//生成高斯矩阵
		for (i = 0, x = -radius; x <= radius; x++, i++) {
			g = a * Math.exp(b * x * x);
			gaussMatrix[i] = g;
			gaussSum += g;

		}

		//归一化, 保证高斯矩阵的值在[0,1]之间
		for (i = 0, len = gaussMatrix.length; i < len; i++) {
			gaussMatrix[i] /= gaussSum;
		}

		//x方向
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = x + j;
					if (k >= 0 && k < width) { //确保 k 没超出 x 的范围

						i = (y * width + k) * 4;
						r += data[i] * gaussMatrix[j + radius];
						g += data[i + 1] * gaussMatrix[j + radius];
						b += data[i + 2] * gaussMatrix[j + radius];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;

				data[i] = r / gaussSum;
				data[i + 1] = g / gaussSum;
				data[i + 2] = b / gaussSum;
			}
		}
		//y方向
		for (x = 0; x < width; x++) {
			for (y = 0; y < height; y++) {
				r = g = b = a = 0;
				gaussSum = 0;
				for (j = -radius; j <= radius; j++) {
					k = y + j;
					if (k >= 0 && k < height) { //确保 k 没超出 y 的范围
						i = (k * width + x) * 4;
						r += data[i] * gaussMatrix[j + radius];
						g += data[i + 1] * gaussMatrix[j + radius];
						b += data[i + 2] * gaussMatrix[j + radius];
						gaussSum += gaussMatrix[j + radius];
					}
				}
				i = (y * width + x) * 4;
				data[i] = r / gaussSum;
				data[i + 1] = g / gaussSum;
				data[i + 2] = b / gaussSum;

			}
		}
		return imageData;

	}


	//颜色减淡
	function colorDodge(copyData, imageData) { //结果色 = 基色 + (混合色 * 基色) / (255 – 混合色)
		var data = imageData.data;
		var data2 = copyData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i] = data[i] + (data2[i] * data[i]) / (255 - data2[i]);
			data[i + 1] = data[i + 1] + (data2[i + 1] * data[i + 1]) / (255 - data2[i + 1]);
			data[i + 2] = data[i + 2] + (data2[i + 2] * data[i + 2]) / (255 - data2[i + 2]);
		}
		return imageData;
	}


	//马赛克  参数说明：width为数据体的宽度，height为高度
	//将图片栅格化处理，把图片按照马赛克的大小分割成与马赛克宽高一致的格，
	//随机抽取格内的某一像素的颜色作为采色点填充该格
	/**
	 * [mosaicsFilter description]
	 * @param  {[type]} data   [description]
	 * @param  {[type]} width  [description]
	 * @param  {[type]} height [description]
	 * @return {[type]}        [description]
	 */
	function mosaicsFilter(imageData) {
		var data = imageData.data,
			height = imageData.height,
			width = imageData.width;
		//设置马赛克的宽高
		var mosaic = {
			x: 10,
			y: 10
		};


		//像素赋值	
		//获取指定区域的像素数据后将图片进行马赛克格子划分
		for (var i = 0; i < height; i += mosaic.y)
			for (var j = 0; j < width; j += mosaic.x) {

				var num = Math.random();
				//随机抽取方格里面的一个像素点作为采色点
				var randomPixel = {
					x: Math.floor(num * mosaic.x + i),
					y: Math.floor(num * mosaic.y + j)
				};
				//获取到randomPixel之后，做一个格子内部的二维循环，将像素逐个赋值到格子内部所有像素，从而达到一个由点到面的效果
				for (var k = j; k < j + mosaic.x; k++)
					for (var l = i; l < i + mosaic.y; l++) {
						data[(l * width + k) * 4] = data[(randomPixel.x * width + randomPixel.y) * 4];
						data[(l * width + k) * 4 + 1] = data[(randomPixel.x * width + randomPixel.y) * 4 + 1];
						data[(l * width + k) * 4 + 2] = data[(randomPixel.x * width + randomPixel.y) * 4 + 2];
						data[(l * width + k) * 4 + 3] = data[(randomPixel.x * width + randomPixel.y) * 4 + 3];
					}
			}

		return imageData;
	}


	/*
		 霓虹效果：用来描绘图像的轮廓，勾画颜色变化的边缘，加强其过度效果，产生轮廓发光的效果。
	                      主要是根据当前像素与其右方和下方像素的梯度运算，然后将结果值作为当前像素值，
	                      即将原图像当前像素的R、G、B分量与其右方和下方像素做梯度运算(差的平方和的平方根)，
	                      然后将梯度值作为处理后像素的R、G、B的三个分量。
	                      [  result = Math.Sqrt( (src-right)*(src-right) + (src-bottom)*(src-bottom) )  ]
		 */
	function neonFilter(imageData) {
		var data = imageData.data,
			width = imageData.width;
		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data[i] = Math.sqrt((data[i] - data[i + 4]) * (data[i] - data[i + 4]) +
					(data[i] - data[i + width * 4]) * (data[i] - data[i + width * 4]));
			}
		}
		return imageData;

	}

	//曝光效果
	function exposureFilter(imageData) {
		var data = imageData.data;
		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 !== 0) {
				if (data[i] < 128)
					data[i] = 255 - data[i]; //逆转值小于128的R、G、B分量值，产生正片和负片混合的效果。
			}
		}
		return imageData;

	}

	/* 
	 * 设定一个阀值，灰度化
	 * 再把相邻的两个像素的灰度去比较，当灰度变化超过一定的量的时候，我们就判断它是轮廓。
	 * 如果本点灰度与临近点灰度变化值大于阈值，置黑色；否则，置白色
	 */
	//效果不明显  ----
	//铅笔画效果
	function pencilDrawing(imageData) {
		var data = imageData.data;
		//阀值越小则线越多
		var value = 10;
		//需调用灰度化方法
		grayFilter(imageData);

		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 !== 0) {
				//点灰度与临近点灰度变化值
				var c = Math.abs(data[i] - data[i + 4]);

				if (c > value)
					data[i] = 0;
				else
					data[i] = 255;
			}
		}

		return imageData;
	}

	/*
		木雕效果：如果本点灰度与临近点灰度差值大于阈值，置白色；否则，置黑色 
		 */
	function woodCarving(imageData) {
		var data = imageData.data;
		//阀值越小则线越多
		var value = 10;
		//需调用灰度化方法
		grayFilter(imageData);

		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 !== 0) {
				//点灰度与临近点灰度变化值
				var c = Math.abs(data[i] - data[i + 4]);

				if (c > value)
					data[i] = 255;
				else
					data[i] = 0;
			}
		}

		return imageData;
	}

	//柔化效果
	/*将二维卷积分为x和y方向进行遍历
		 柔化(平滑)处理是将原图像的每个像素的颜色值用与其相邻的n*n个像素的平均值来代替，
	         可利用算术平均值或加权平均值来计算。
	     */
	function softenFilter(imageData) {
		var data = imageData.data,
			width = imageData.width,
			height = imageData.height;
		//x方向
		for (y = 0; y < height; y++) {
			for (x = 0; x < width; x++) {
				r = g = b = a = 0;
				for (j = -1; j <= 1; j++) {
					k = x + j;
					if (k >= 0 && k < width) { //确保 k 没超出 x 的范围

						i = (y * width + k) * 4;
						r += data[i];
						g += data[i + 1];
						b += data[i + 2];
					}
				}
				i = (y * width + x) * 4;

				data[i] = r / 3
				data[i + 1] = g / 3;
				data[i + 2] = b / 3;
			}
		}


		//y方向
		for (x = 0; x < width; x++) {
			for (y = 0; y < height; y++) {
				r = g = b = a = 0;

				for (j = -1; j <= 1; j++) {
					k = y + j;
					if (k >= 0 && k < height) { //确保 k 没超出 y 的范围
						i = (k * width + x) * 4;
						r += data[i];
						g += data[i + 1];
						b += data[i + 2];

					}
				}
				i = (y * width + x) * 4;
				data[i] = r / 3;
				data[i + 1] = g / 3;
				data[i + 2] = b / 3;

			}
		}
		return imageData;

	}


	//素描	注意传参的不同
	function sketchFilter(radius, sigma, imageData) {
		var copyData,
			width = imageData.width,
			height = imageData.height;
		//去色
		copyData = grayFilter(imageData);
		//复制一份
		//复制一份
		canvas.width = width;
		canvas.height = height;
		context.clearRect(0, 0, width, height); //根据不同场景使用不同的范围
		context.putImageData(imageData, 0, 0);
		copyData = context.getImageData(0, 0, width, height); //根据不同场景使用不同的范围
		//对复制的数据取反
		negativeFilter(copyData);
		//高斯模糊
		GaussianBlur(radius, sigma, copyData);
		//颜色减淡
		colorDodge(copyData, imageData);
	}


	//锐化	注意传参的不同，参数说明：
	function sharpenFilter(imageData) {
		//卷积矩阵
		var weights = [0, -1, 0, -1, 10, -1,
			0, -1, 0
		];
		var side = Math.round(Math.sqrt(weights.length));
		var halfSide = Math.floor(side / 2);

		var src = imageData.data;
		var sw = imageData.width;
		var sh = imageData.height;
		var w = sw;
		var h = sh;

		var dst = imageData.data;
		var opaque = 1;
		var alphaFac = opaque ? 1 : 0;

		for (var y = 0; y < h; y++) {
			for (var x = 0; x < w; x++) {
				var sy = y;
				var sx = x;
				var dstOff = (y * w + x) * 4;
				//将canvas元素中的像素数组与变换矩阵数组进行相乘运算
				var r = 0,
					g = 0,
					b = 0,
					a = 0;
				for (var cy = 0; cy < side; cy++) {
					for (var cx = 0; cx < side; cx++) {
						var scy = sy + cy - halfSide;
						var scx = sx + cx - halfSide;
						if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
							var srcOff = (scy * sw + scx) * 4;
							var wt = weights[cy * side + cx];
							r += src[srcOff] * wt;
							g += src[srcOff + 1] * wt;
							b += src[srcOff + 2] * wt;
							a += src[srcOff + 3] * wt;
						}
					}
				}
				dst[dstOff] = r;
				dst[dstOff + 1] = g;
				dst[dstOff + 2] = b;
				dst[dstOff + 3] = a + alphaFac * (255 - a);
			}
		}
		return imageData;
	}



	/*
		 对比度算法公式。
	    Photoshop对于对比度增量，是按给定值的正负分别处理的。
	    如果用newRGB表示图像像素新的R、G、B分量，RGB表示图像像素R、G、B分量，Threshold为给定的阀值，
	    Contrast为对比度增量，当Contrast大于0时：
	         1) newRGB = RGB + (RGB - Threshold) * (1 / (1 - Contrast / 255) - 1)
	    其中，当Contrast等于255时(RGB - Threshold) * (1 / (1 - Contrast / 255) - 1)为无限(±)，
	    由于RGB最大最小值分别为255和0，因此，只能按Threshold来确定newRGB，即newRGB = RGB >= Threshold? 255 : 0，
	    这实际就是设置图像阀值，图像由最多八种颜色组成，即红、黄、绿、青、蓝、紫及黑与白，在灰度图上也只有最多8条线。
	    当Contrast小于0时：
	        2) newRGB = RGB + (RGB - Threshold) * Contrast / 255
	    其中，当Contrast等于-255时，图像RGB各分量都等于阀值，图像呈全灰色，灰度图上只有1条线，即阀值灰度。

		 */
	function reContrast(contrast, imageData) {
		var data = imageData.data;
		var threshold = 128; //阀值

		for (var i = 0; i < data.length; i++) {
			if ((i + 1) % 4 !== 0) {
				if (contrast > 0) {
					data[i] = data[i] + (data[i] - threshold) * (1 / (1 - contrast / 255) - 1);
					if (contrast >= 255)
						data[i] = data[i] >= threshold ? 255 : 0;
				} else if (contrast < 0) {
					data[i] = data[i] + (data[i] - threshold) * contrast / 255;
				}
			}
		}

		return imageData;

	}

	//提高亮度
	function brightnessFilter(value, imageData) {
		var data = imageData.data;
		for (var i = 0; i < data.length; i += 4) {
			data[i] += value;
			data[i + 1] += value;
			data[i + 2] += value;
		}
		return imageData;
	}



	/*
	
	溶图
	author:mydoodle
	data:2/22/2014
	version:1.1
	
	1.总括： 实现图像混合的原理其实很简单，就是将两张图像的重叠，分别取相同位置的两个像素点上的RGB值，
	通过特定的公式计算出新的RGB值，这样，不公的公式，将产生不同的色彩效果

	2.注意：遍历时，应该注意是否有用到a通道；是否存在边界问题

	 */


	//变暗效果
	function getDark(data1, data2) {
		//变暗效果具体运算
		var darken = function(a, b) {
			var r = {};
			for (var i in a) {
				r[i] = a[i] < b[i] ? a[i] : b[i]; //两幅图中各像素的不同分量中较暗的
			}
			return r;
		}

		//遍历每个像素
		for (var i = 0; i < data1.length; i += 4) {
			//调用变暗效果函数获取新的值
			var newRGB = darken({
				r: data1[i],
				g: data1[i + 1],
				b: data1[i + 2]
			}, {
				r: data2[i],
				g: data2[i + 1],
				b: data2[i + 2]
			});
			//将新的值赋值
			data1[i] = newRGB.r;
			data1[i + 1] = newRGB.g;
			data1[i + 2] = newRGB.b;

		}

	}

	//排除
	function eliminate(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) { //注意排除a通道，否则会出错
				data1[i] = data1[i] + data2[i] - 2 * data1[i] * data2[i] / 255;
			}
		}
	}
	//差值
	function D_value(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = Math.abs(data1[i] - data2[i]);
			}
		}
	}
	//实色混合
	function mix(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data2[i] < 128 ? (data2[i] == 0 ? 2 * data2[i] : Math.max(0, (255 - ((255 - data1[i]) << 8) / (2 * data2[i])))) :
					((2 * (data2[i] - 128)) == 255 ? (2 * (data2[i] - 128)) : Math.min(255, ((data1[i] << 8) /
						(255 - (2 * (data2[i] - 128))))))) < 128 ? 0 : 255;

			}
		}
	}


	//点光
	function DainGuang(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = Math.max(0, Math.max(2 * data2[i] - 255, Math.min(data2[i], 2 * data1[i])));
			}
		}
	}

	//线性光
	function linearity(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = Math.min(255, Math.max(0, (data2[i] + 2 * data1[i]) - 1));
			}
		}
	}

	//亮光
	function light(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = data2[i] < 128 ? (data2[i] == 0 ? 2 * data2[i] : Math.max(0, (255 -
					((255 - data1[i]) << 8) / (2 * data2[i])))) :
					((2 * (data2[i] - 128)) == 255 ? (2 * (data2[i] - 128)) : Math.min(255, ((data1[i] << 8) / (255 - (2 * (data2[i] - 128))))));
			}
		}
	}

	//强光
	function StrongLight(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data1[i] < 128) ? (2 * data1[i] * data2[i] / 255) :
					(255 - 2 * (255 - data1[i]) * (255 - data2[i]) / 255);
			}
		}
	}

	//柔光
	function SoftLight(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = data2[i] < 128 ? (2 * ((data1[i] >> 1) + 64)) * (data2[i] / 255) : (255 - (2 * (255 - ((data1[i] >> 1) + 64)) * (255 - data2[i]) / 255));
			}
		}
	}

	//叠加
	function DieJia(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data2[i] < 128) ? (2 * data1[i] * data2[i] / 255) :
					(255 - 2 * (255 - data1[i]) * (255 - data2[i]) / 255);
			}
		}
	}

	//线性减淡
	function linearityReduce(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = Math.min(255, (data1[i] + data2[i]));
			}
		}
	}

	//颜色减淡
	function colorReduce(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data2[i] == 255) ? data2[i] : Math.min(255, ((data1[i] << 8) / (255 - data2[i])));
			}
		}
	}

	//滤色
	function filtrate(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = 255 - (((255 - data1[i]) * (255 - data2[i])) >> 8);
			}
		}
	}

	//变亮
	function getBright(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data2[i] > data1[i]) ? data2[i] : data1[i];
			}
		}
	}

	//线性加深
	function linearityAdd(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = (data1[i] + data2[i] < 255) ? 0 : (data1[i] + data2[i] - 255);
			}
		}
	}

	//颜色加深
	function colorAdd(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = data2[i] == 0 ? data2[i] :
					Math.max(0, Math.max(0, (255 - ((255 - data1[i]) << 8) / data2[i])));
			}
		}
	}

	//正片叠加
	function ZPDJ(data1, data2) {
		for (var i = 0; i < data1.length; i++) {
			if ((i + 1) % 4 !== 0) {
				data1[i] = data1[i] * data2[i] / 255;
			}
		}
	}
