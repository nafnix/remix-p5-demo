import P5 from "p5"
import { useEffect, useRef } from "react"

interface Points {
  start: P5.Vector
  control: [P5.Vector, P5.Vector]
  end: P5.Vector
}

// 绘制给定 t 值下的贝塞尔曲线段
function drawBezierSegment(i: P5, points: Points, t: number) {
  i.beginShape()
  for (let index = 0; index < t; index += 0.01) {
    const x = i.bezierPoint(points.start.x, points.control[0].x, points.control[1].x, points.end.x, index)
    const y = i.bezierPoint(points.start.y, points.control[0].y, points.control[1].y, points.end.y, index)
    i.vertex(x, y)
  }
  i.endShape()
}

function Sketch(i: P5) {
  i.setup = () => {
    i.createCanvas(window.innerWidth, window.innerHeight)

    i.stroke(255)
    i.strokeWeight(3)
    i.noFill()
  }

  let t = 0
  let end = 0

  i.draw = () => {
    const width = i.width
    const height = i.height

    end = end || i.random(width / 5 * 2, width / 5 * 3)
    drawBezierSegment(
      i,
      {
        start: i.createVector(Math.ceil(width / 3 * 2), 0),
        control: [i.createVector(width / 10 * 7, width / 10 * 3), i.createVector(width / 10 * 8, width / 10)],
        end: i.createVector(end, height),
      },
      t,
    )

    if (t !== 1)
      t += 0.05
  }
}

function P5Element() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const P5Container = container.current!
    const _ = new P5(Sketch, P5Container)

    window.addEventListener("resize", () => {
      _.resizeCanvas(window.innerWidth, window.innerHeight)
    })

    return () => P5Container.childNodes.forEach(node => node.remove())
  }, [])

  return (
    <div ref={container} className="fixed left-0 top-0 z--1000 h-screen w-screen bg-dark"></div>
  )
}

export default P5Element
