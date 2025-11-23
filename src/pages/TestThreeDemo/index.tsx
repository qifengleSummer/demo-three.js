import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three-stdlib'

const TestThreeDemo = () => {
	const cube = useRef<null | THREE.Mesh<
		THREE.BoxGeometry,
		THREE.MeshStandardMaterial,
		THREE.Object3DEventMap
	>>(null)

	// 创建场景
	const scene = new THREE.Scene()
	scene.background = new THREE.Color(0x778899)

	// 创建相机
	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000,
	)

	camera.position.set(0, 0, 5) // 设置相机位置
	// camera.position.XYZ, 先绕X，再绕Y，最后绕Z
	camera.lookAt(new THREE.Vector3(0, 0, 0)) // 使相机看向目标点

	// 创建渲染器
	const renderer = new THREE.WebGLRenderer()
	renderer.setSize(window.innerWidth - 200, window.innerHeight - 200)
	document.body.appendChild(renderer.domElement)

	// 创建控制器
	const controls = new OrbitControls(camera, renderer.domElement)
	// 基础配置
	controls.enableDamping = true // 启用阻尼（惯性效果）
	controls.dampingFactor = 0.05 // 阻尼系数
	controls.rotateSpeed = 1.0 // 旋转速度
	controls.zoomSpeed = 1.0 // 缩放速度
	controls.panSpeed = 1.0 // 平移速度
	// 限制设置
	controls.minDistance = 2 // 最小缩放距离
	controls.maxDistance = 50 // 最大缩放距离
	controls.maxPolarAngle = Math.PI // 最大垂直角度（允许看到底部）
	// 目标点（相机围绕的点）
	controls.target.set(0, 0, 0)

	const createCube = () => {
		const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(1, 1.5, 2)

		// 材质 - 明确的类型注解
		const material: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial(
			{
				// color: 0xffffff,
				// roughness: 0.4,
				// metalness: 0.6,
				color: 0x000000, // 基础颜色为黑
				emissive: 0xff8900, // 但自己发出红光
				emissiveIntensity: 1.0,
			},
		)

		// 网格 - 明确的类型注解
		cube.current = new THREE.Mesh(geometry, material)
		scene.add(cube.current)
	}

	const animate = () => {
		requestAnimationFrame(animate)

		controls.update()
		renderer.render(scene, camera)
	}

	const setupLight = () => {
		// 万金油组合：环境光(基础亮度) + 平行光(主要照明) + 点光源(局部强调) = 完美的光照效果
		// 渲染的最终颜色 = 材质颜色 × 光照颜色 × 光照强度
		// 颜色的产生过程：光源发出光 → 物体表面反射/吸收 → 反射光进入眼睛 → 大脑解读为颜色（自发光物体[光源]和反射光物体）
		// 红色苹果，白光(包含所有颜色) → 苹果皮吸收绿蓝光，反射红光 → 红光进入眼睛 → 我们看到红色苹果

		// 太阳光 → 人眼 → 大脑解读
		// const colorPerception = {
		//     物理输入: "完整光谱的红橙黄绿青蓝紫光",
		//     生物采样: "只被三种锥细胞捕获：红、绿、蓝通道",
		//     大脑合成: "根据三通道信号重新构造颜色感觉"
		// };

		// 举例：看到黄色物体
		// 物理现实: "物体反射黄光(波长570-590nm)",
		// 人眼反应: "同时刺激红色和绿色锥细胞",
		// 大脑解读: "红+绿 = 黄色！"

		//  const rgbModel = {
		//     科学依据: "基于人眼生物学",
		//     红色通道: "对应L型锥细胞的敏感范围",
		//     绿色通道: "对应M型锥细胞的敏感范围",
		//     蓝色通道: "对应S型锥细胞的敏感范围",
		//     设计原理: "用三个数值模拟三锥细胞的兴奋程度"
		// };

		// const realityVsPerception = {
		//     物理光谱: {
		//         描述: "客观存在的电磁波波长分布",
		//         特点: "连续、无限多种颜色",
		//         例子: "彩虹有无数种渐变色"
		//     },

		//     感知颜色: {
		//         描述: "人脑对三通道信号的解释",
		//         特点: "离散、有限组合",
		//         例子: "计算机用256×256×256种RGB组合"
		//     }
		// };

		// 所有这些在视觉上都是"黄色"，但物理本质不同：
		// const yellowRepresentations = {
		//     // 物理黄光（理论上）
		//     pureYellow: "单一波长580nm的光",

		//     // RGB模拟黄光（实际使用）
		//     rgbYellow: 0xffff00,  // 红255 + 绿255 + 蓝0

		//     // Three.js中的使用
		//     yellowMaterial: new THREE.MeshStandardMaterial({
		//         color: 0xffff00  // 这不是"真"黄色，而是红绿混合
		//     })
		// };

		// 但视觉效果完全一样！

		// 环境光 ambientLight -> 全局背景光
		const ambientLight = new THREE.AmbientLight(0xff809f, 1) // 由于没有明确的光源方向，均匀地照亮所有地方，所有物体看起来都是均匀的灰色，没有立体感
		scene.add(ambientLight)
		// ****************************************************
		// 平行光 directionalLight
		// const directionalLight = new THREE.DirectionalLight(0xffffff, 10)
		// // directionalLight.position.set(1, 1, 20)
		// scene.add(directionalLight)
		// ****************************************************
		// 点光源 PointLight -> 以灯泡为中心，向四周发射光线
		// const pointLight = new THREE.PointLight(0xffffff, 10.0) //参数1：Oxffffff是纯白光,表示光源颜色//参数2：1.0,表示光照强度
		// // pointLight.position.set(1, 2, 20) //点光源放在x轴上
		// scene.add(pointLight)
		// ****************************************************
		// 聚光灯光源 SpotLight
		// const spotLight = new THREE.SpotLight(0xffffff, 10.0) //参数1：Oxffffff是纯白光,表示光源颜色//参数2：1.0,表示光照强度
		// // spotLight.position.set(1, 0, 20) //点光源放在x轴上
		// scene.add(spotLight)
	}

	const drawCar = () => {
		// 创建立方体
		createCube()
		setupLight()
		animate()
	}

	useEffect(() => {
		drawCar()
	}, [])

	return <div>this is car.</div>
}

export default TestThreeDemo
