import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Zap, Target } from "lucide-react"
import { motion } from "framer-motion"

const LandingFeature = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Boost Efficiency",
      desc: "Automate repetitive tasks and free up your time for what really matters.",
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Stay Focused",
      desc: "Keep your goals in sight with intuitive organization and reminders.",
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Smart Insights",
      desc: "Analyze progress and optimize your workflow with actionable data.",
    },
  ]

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-900 px-6 transition-colors">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
          Why choose <span className="text-blue-600 dark:text-blue-400">Propella</span>?
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Everything you need to propel your productivity to the next level, all in
          one platform.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="rounded-2xl shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex justify-center mb-4">{f.icon}</div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default LandingFeature
